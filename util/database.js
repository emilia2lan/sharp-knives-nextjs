import camelcaseKeys from 'camelcase-keys';
import postgres from 'postgres';

import { generateToken } from './sessions';

require('dotenv-safe').config();

// Connect to PostgresSQL
const sql = postgres();

function camelcaseRecords(records) {
  return records.map((record) => camelcaseKeys(record));
}

// Session table from DB
export async function isSessionTokenNotExpired(sessionToken) {
  const sessions = await sql`
    SELECT
      *
    FROM
      session
    WHERE
      token = ${sessionToken} AND
      expiry > NOW()
  `;
  return sessions.length > 0;
}

export async function createSessionFiveMinutesExpiry() {
  const token = generateToken();
  const sessions = await sql`
  INSERT INTO session(token, expiry)
  VALUES
  (${token}, NOW() + INTERVAL '5 minutes')
  RETURNING *`;
  return camelcaseRecords(sessions)[0];
}
export async function createSessionByUserId(userId) {
  const token = generateToken();

  const sessions = await sql`
    INSERT INTO session
      (token, user_id)
    VALUES
      (${token}, ${userId})
    RETURNING *
  `;

  return camelcaseRecords(sessions)[0];
}

export async function getSessionByToken(sessionToken) {
  if (!sessionToken) {
    return undefined;
  }

  const sessions = await sql`
    SELECT
      *
    FROM
      session
    WHERE
      token = ${sessionToken} AND
      expiry > NOW()
  `;
  return camelcaseRecords(sessions)[0];
}

export async function deleteSessionById(id) {
  const sessions = await sql`
    DELETE FROM
      sessions
    WHERE
      id = ${id}
    RETURNING *
  `;
  return camelcaseRecords(sessions)[0];
}
export async function deleteSessionByToken(token) {
  const sessions = await sql`
    DELETE FROM
      sessions
    WHERE
      token = ${token}
    RETURNING *
  `;
  return camelcaseRecords(sessions)[0];
}

export async function deleteAllExpiredSessions() {
  const sessions = await sql`
    DELETE FROM
      session
    WHERE
      expiry < NOW()
    RETURNING *
  `;
  return camelcaseRecords(sessions)[0];
}

// User table from BD
export async function getUserById(id) {
  const users = await sql`
    SELECT
      id,
      username
    FROM
      users
    WHERE
      id = ${id}
  `;
  return camelcaseRecords(users)[0];
}

export async function getUserByUsername(username) {
  const users = await sql`
    SELECT
      username
    FROM
      users
    WHERE
      username = ${username}
  `;
  return camelcaseRecords(users)[0];
}

export async function getUserWithHashedPasswordByUsername(username) {
  const users = await sql`
    SELECT
     *
    FROM
      users
    WHERE
      username = ${username}
  `;
  return camelcaseRecords(users)[0];
}
export async function createUser(username, passwordHash) {
  const users = await sql`
    INSERT INTO users
      (username, password_hash)
    VALUES
      (${username}, ${passwordHash})

    RETURNING id, username
  `;
  return camelcaseRecords(users)[0];
}
