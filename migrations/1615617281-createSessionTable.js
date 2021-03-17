exports.up = async (sql) => {
  await sql`
	CREATE TABLE session
	( id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	TOKEN VARCHAR(40),
	EXPIRY TIMESTAMP NOT NULL DEFAULT NOW() + INTERVAL '24 hours'
	);
	`;
};

exports.down = async (sql) => {
  await sql`
	DROP TABLE session`;
};
