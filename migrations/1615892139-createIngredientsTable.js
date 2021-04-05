exports.up = async function (sql) {
  await sql`
    CREATE TABLE ingredients (
  id INT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  name VARCHAR(100) NOT NULL
);
  `;
};

exports.down = async function (sql) {
  await sql`
    DROP TABLE IF EXISTS ingredients;
  `;
};
