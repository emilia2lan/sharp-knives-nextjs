const junction = [
  {
    recipeName: 'Mici - the Romanian meat sausages',
    ingredients: [
      'ground beef',
      'ground pork',
      'beef stock',
      'baking soda',
      'garlic',
      'thyme',
      'nutmeg',
      'coriander powder',
      'ground pepper',
    ],
  },

  {
    recipeName: 'Homemade Sushi',
    ingredients: [
      'sheets sushi seaweed',
      'rice',
      'cream cheese',
      'avocado',
      'soy sauce',
      'ginger',
    ],
  },

  {
    recipeName: 'Vietnamese Pho soup',
    ingredients: [
      'ginger',
      'cloves',
      'beef brisket',
      'beef bones',
      'beef tenderloin',
      'brisket',
    ],
  },
  {
    recipeName: 'Hungarian lángos',
    ingredients: [
      'potatoes',
      'instant yeast',
      'sugar',
      'all purpose flour',
      'vegetable oil',
      'salt',
      'milk',
    ],
  },
  {
    recipeName: 'One pot vegan stew with coconut milk',
    ingredients: [
      'quinoa',
      'red pepper',
      'paprika powder',
      'coconut milk',
      'dried tomatoes',
      'canned tomatoes',
      'tomatoes',
      'oregano',
    ],
  },
  {
    recipeName: 'Scrambled eggs',
    ingredients: ['eggs', 'milk', 'butter', 'ham'],
  },

  {
    recipeName: 'Homemade pizza',
    ingredients: [
      'all purpose flour',
      'warm water',
      'instant yeast',
      'salt',
      'mozzarella',
      'mushrooms',
      'fresh basil',
      'pesto',
      'ham',
      'tomatoes',
    ],
  },
];

exports.up = async (sql) => {
  await sql`
	CREATE TABLE recipes_ingredients( id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
		recipeName INT REFERENCES recipes(id),
		ingredients INT REFERENCES ingredients(id)
		);`;

  for (let i = 0; i < junction.length; i++) {
    const recipeId = await sql`
	SELECT id FROM recipes WHERE recipes.name = ${junction[i].recipeName}`;

    for (let j = 0; j < junction[i].ingredients.length; j++) {
      const ingredientsId = await sql`SELECT id FROM ingredients WHERE ingredients.name = ${junction[i].ingredients[j]}`;
      // console.log(junction[i].ingredients[j], ingredientsId);

      await sql`INSERT INTO recipes_ingredients (recipeName, ingredients) VALUES (${recipeId[0].id}, ${ingredientsId[0].id});`;
    }
  }
};

exports.down = async (sql) => {
  await sql`DELETE FROM recipes_ingredients
`;

  await sql`
	DROP TABLE recipes_ingredients`;
};
