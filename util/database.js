import camelcaseKeys from 'camelcase-keys';
import postgres from 'postgres';
import { generateToken } from './sessions';

require('dotenv-safe').config();

// Connect to PostgresSQL
const sql = postgres();

function camelcaseRecords(records) {
  return records.map((record) => camelcaseKeys(record));
}

export async function createSessionFiveMinutesExpiry() {
  const token = generateToken();
  const sessions = await sql`
  INSERT INTO sessions(token, expiry)
  VALUES
  (${token}, NOW() + INTERVAL '5 minutes')
  RETURNING *`;
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
      sessions
    WHERE
      token = ${sessionToken} AND
      expiry > NOW()
  `;
  return camelcaseRecords(sessions)[0];
}

export async function deleteAllExpiredSessions() {
  const sessions = await sql`
    DELETE FROM
      sessions
    WHERE
      expiry < NOW()
    RETURNING *
  `;
  return camelcaseRecords(sessions)[0];
}

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

// export async function createSessionByUserId(userId) {}

// export async function getUserName() {
//   await sql`SELECT * FROM sharpknives`;
//   return camelcaseRecords(sharpknives);
// }
