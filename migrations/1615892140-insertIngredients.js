exports.up = async function (sql) {
  await sql`
   INSERT INTO ingredients
  (name)
VALUES
  ('ground beef'),
  ('ground pork'),
  ('beef stock'),
  ('baking soda'),
  ('garlic'),
  ('thyme'),
  ('nutmeg'),
  ('coriander powder'),
  ('ground pepper'),
  ('sheets sushi seaweed'),
  ('rice'),
  ('cream cheese'),
  ('avocado'),
  ('soy sauce'),
  ('ginger'),
  ('cloves'),
  ('beef brisket'),
  ('beef bones'),
	('beef tenderloin'),
	('brisket'),
	('potatoes'),
	('instant yeast'),
	('sugar'),
	('all purpose flour'),
	('vegetable oil'),
	('salt'),
	('milk'),
	('quinoa'),
	('red pepper'),
	('paprika powder'),
	('coconut milk'),
	('dried tomatoes'),
	('canned tomatoes'),
	('tomatoes'),
	('oregano'),
	('eggs'),
	('butter'),
	('warm water'),
	('mozzarella'),
	('mushrooms'),
	('fresh basil'),
	('pesto'),
	('ham'),
  (cream),
  (scallops)
  ;`;
};

exports.down = async function (sql) {
  await sql`
    DELETE FROM ingredients;
  `;
};
