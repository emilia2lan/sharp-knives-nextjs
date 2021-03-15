import { NextApiRequest, NextApiResponse } from 'next';
import { hashPassword } from '../../util/auth';
import { createUser, getUserByUsername } from '../../util/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { username, password } = req.body;

  const userAlreadyExist =
    typeof (await getUserByUsername(username)) !== 'undefined';

  if (userAlreadyExist) {
    return res
      .status(409)
      .send({ errors: [{ message: 'User already exist' }], user: null });
  }

  const passwordHash = await hashPassword(password);

  const user = await createUser(username, passwordHash);
  console.log('user register.ts', user);
  res.send({ user });
}
