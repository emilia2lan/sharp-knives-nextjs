import {
  NextApiRequest,
  NextApiResponse,
} from 'next';

import { hashPassword } from '../../util/auth';
import { serializeSecureCookieServerSide } from '../../util/cookies';
import {
  createSessionByUserId,
  createUser,
  getUserByUsername,
} from '../../util/database';

// checks if a username already register/exist in DB and show an error message in case there is a match. If no match is found a new registration follows.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { username, password } = req.body;
  const userAlreadyExist = (await getUserByUsername(username)) !== 'undefined';

  if (userAlreadyExist) {
    return res
      .status(409)
      .send({ errors: [{ message: 'User already exists' }], user: null });
  }

  const passwordHash = await hashPassword(password);

  const user = await createUser(username, passwordHash);

  const session = await createSessionByUserId(user.id);
  // get the cookie from server side to the API routes
  const sessionCookie = serializeSecureCookieServerSide(
    'session',
    session.token,
  );

  res.setHeader('Set-Cookie', sessionCookie);

  res.send({ user });
}
