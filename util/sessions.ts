import crypto from 'crypto';

// encrypts the token
export function generateToken(): string {
  return crypto.randomBytes(24).toString('base64');
}
