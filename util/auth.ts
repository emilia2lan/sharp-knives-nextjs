import argon2 from 'argon2';
import Tokens from 'csrf';

const tokens = new Tokens();

// encrypts the user password
export async function hashPassword(password: string) {
  return argon2.hash(password);
}

export async function doesPasswordMatchPasswordHash(
  password: string,
  passwordHash: string,
) {
  return argon2.verify(passwordHash, password);
}

// add a level of security to the tokens from sessions
function createCsrfSecret(sessionToken: string) {
  return sessionToken + process.env.CSRF_SECRET_SALT;
}

export function createCsrfToken(sessionToken: string) {
  const secret = createCsrfSecret(sessionToken);
  return tokens.create(secret);
}

export function doesCsrfTokenMatchSessionToken(
  csrfToken: string,
  sessionToken: string,
) {
  const secret = createCsrfSecret(sessionToken);
  return tokens.verify(secret, csrfToken);
}
