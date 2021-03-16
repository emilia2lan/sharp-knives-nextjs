import argon2 from 'argon2';

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
