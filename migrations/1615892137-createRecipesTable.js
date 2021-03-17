exports.up = async (sql) => {
  await sql`
	CREATE TABLE recipes
	( id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	name VARCHAR(100),
	instructions TEXT,
	cooking_time INT,
	prep_time INT,
	img VARCHAR(50)
	);
	`;
};

exports.down = async (sql) => {
  await sql`
	DROP TABLE recipes`;
};
