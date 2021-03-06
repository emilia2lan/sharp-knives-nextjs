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
  ('speckled trout'),
  ('salmon'),
  ('capers'),
  ('white cooking wine'),
  ('fresh parsley'),
  ('chicken thighs'),
  ('honey'),
  ('beef sirloin'),
  ('broccoli'),
  ('red bell pepper'),
  ('carrots'),
  ('green onion'),
  ('sesame seeds'),
  ('graham cracker crumbs'),
  ('powdered sugar'),
  ('cherry'),
  ('raspberries'),
  ('vanilla extract'),
  ('baking powder'),
  ('bacon'),
  ('onion'),
  ('caraway seeds'),
  ('hot sweet paprika'),
  ('lamb shoulder'),
  ('swede'),
  ('cabbage'),
  ('vegetable stock'),
  ('water'),
  ('pot cheese'),
  ('zest of one lemon'),
  ('jam'),
  ('sour cream'),
  ('pot cheese'),
  ('zest of one lemon'),
  ('jam'),
  ('sliced bread'),
  ('shredded cheese')
    `;
};

exports.down = async function (sql) {
  await sql`
    DELETE FROM ingredients;
  `;
};
