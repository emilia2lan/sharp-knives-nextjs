exports.up = async (sql) => {
  await sql`
	CREATE TABLE users_recipes(id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
		user_id INT REFERENCES users(id),
		recipes_id INT REFERENCES recipes(id)
	);`;
};

exports.down = async (sql) => {
  await sql`DELETE FROM users_recipes
`;

  await sql`
	DROP TABLE users_recipes`;
};
