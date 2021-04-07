import {
  NextApiRequest,
  NextApiResponse,
} from 'next';

import {
  doesCsrfTokenMatchSessionToken,
  doesPasswordMatchPasswordHash,
} from '../../util/auth';
import { serializeSecureCookieServerSide } from '../../util/cookies';
import {
  createSessionByUserId,
  getUserWithHashedPasswordByUsername,
} from '../../util/database';

// checks if a username already register/exist in DB and show an error message in case there is a match. If no match is found a new registration follows.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { username, password, csrfToken } = req.body;
  const sessionToken = req.cookies.session;
  if (!doesCsrfTokenMatchSessionToken(csrfToken, sessionToken)) {
    return res.status(401).send({
      errors: [{ message: 'CSRF token does not match' }],
      user: null,
    });
  }
  const userWithPasswordHash = await getUserWithHashedPasswordByUsername(
    username,
  );
  // Error if password does not match
  if (!userWithPasswordHash) {
    return res.status(401).send({
      errors: [{ message: 'Username or password does not match' }],
      user: null,
    });
  }

  // 1. destructuring and ... is a rest operator. It`s picking up the passwordHash and what`s left is the user
  const { passwordHash, ...user } = userWithPasswordHash;

  const passwordMatches = await doesPasswordMatchPasswordHash(
    password,
    passwordHash,
  );
  if (!passwordMatches) {
    return res.status(401).send({
      errors: [{ message: 'Username or password does not match' }],
      user: null,
    });
  }

  // successfully authenticated the user
  const session = await createSessionByUserId(user.id);
  // get the cookie from server side to the API routes
  const sessionCookie = serializeSecureCookieServerSide(
    'session',
    session.token,
  );

  res.setHeader('Set-Cookie', sessionCookie);
  res.send({
    user: user,
  });
}
