import argon2 from 'argon2';

// encrypts the user password
export async function hashPassword(password: string) {
  return argon2.hash(password);
}
