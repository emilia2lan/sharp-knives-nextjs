exports.up = async (sql) => {
  await sql`ALTER TABLE session
	ADD COLUMN
	user_id INT REFERENCES users (id) ON DELETE CASCADE`;
};

exports.down = async (sql) => {
  await sql`
	ALTER TABLE session DROP COLUMN user_id`;
};
