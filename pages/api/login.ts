import {
  NextApiRequest,
  NextApiResponse,
} from 'next';

import { doesPasswordMatchPasswordHash } from '../../util/auth';
import { getUserWithHashedPasswordByUsername } from '../../util/database';

// checks if a username already register/exist in DB and show an error message in case there is a match. If no match is found a new registration follows.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { username, password } = req.body;

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

  // return to front end only the user name and id, if you return the whole user then you can expose its password. To get away with that, the commented line nr.1 gets helps me to bring only the passwordhash, and the remaining info will be the user.
  // successfully authenticated the user
  res.send({
    user: user,
  });
}
