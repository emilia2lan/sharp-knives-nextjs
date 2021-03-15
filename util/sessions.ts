import crypto from 'crypto';

export function generateToken(): string {
  return crypto.randomBytes(24).toString('base64');
}
