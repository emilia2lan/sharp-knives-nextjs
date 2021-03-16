import crypto from 'crypto';

import { serializeSecureCookieServerSide } from './cookies';
import {
  createSessionFiveMinutesExpiry,
  isSessionTokenNotExpired,
} from './database';

// encrypts the token
export function generateToken(): string {
  return crypto.randomBytes(24).toString('base64');
}

export async function getValidSessionToken(sessionToken: string) {
  // Assume that the session cookie is NOT valid.
  let isSessionCookieValid = false;
  // let sessionToken = context.req.cookies.session;

  // checks if the session cookie is valid and NOT expired
  if (sessionToken) {
    isSessionCookieValid = await isSessionTokenNotExpired(sessionToken);
  }

  let sessionCookie;

  // if the cookie does NOT exists/valid, it creates a NEW token per session which expires in 5 minutes
  if (!isSessionCookieValid) {
    const session = await createSessionFiveMinutesExpiry();
    sessionToken = session.token;

    sessionCookie = serializeSecureCookieServerSide(
      'session',
      sessionToken,
      60 * 5,
    );
  }

  return { sessionToken, sessionCookie };
}

export async function createSessionWithCookie() {
  const session = await createSessionFiveMinutesExpiry();
  return {
    session: session,
    sessionCookie: serializeSecureCookieServerSide(
      'session',
      session.token,
      60 * 5,
    ),
  };
}
