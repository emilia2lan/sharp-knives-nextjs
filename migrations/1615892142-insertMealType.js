exports.up = async function (sql) {
  await sql`
   INSERT INTO meal_type
  (name)
VALUES
  ('breakfast'),
  ('brunch'),
  ('snacks'),
  ('dinner/lunch'),
  ('supper')
  ;`;
};

exports.down = async function (sql) {
  await sql`
    DELETE FROM meal_type;
  `;
};
