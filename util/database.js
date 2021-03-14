import camelcaseKeys from 'camelcase-keys';
import postgres from 'postgres';

require('dotenv-safe').config();

// Connect to PostgresSQL
const sql = postgres();

function camelcaseRecords(records) {
  return records.map((record) => camelcaseKeys(record));
}

export async function getUserName() {
  await sql`SELECT * FROM sharpknives`;
  return camelcaseRecords(sharpknives);
}
