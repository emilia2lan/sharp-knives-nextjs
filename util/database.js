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

export async function createSessionByUserId(userId) {}

export async function getUserName() {
  await sql`SELECT * FROM sharpknives`;
  return camelcaseRecords(sharpknives);
}
