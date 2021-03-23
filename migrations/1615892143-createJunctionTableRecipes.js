const junction = [
  {
    id_recipeName: 'Mici - the Romanian meat sausages',
    id_ingredients: [
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
    id_recipeName: 'Homemade Sushi',
    id_ingredients: [
      'sheets sushi seaweed',
      'rice',
      'cream cheese',
      'avocado',
      'soy sauce',
      'ginger',
    ],
  },

  {
    id_recipeName: 'Vietnamese Pho soup',
    id_ingredients: [
      'ginger',
      'cloves',
      'beef brisket',
      'beef bones',
      'beef tenderloin',
      'brisket',
    ],
  },
  {
    id_recipeName: 'Hungarian lángos',
    id_ingredients: [
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
    id_recipeName: 'One pot vegan stew with coconut milk',
    id_ingredients: [
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
    id_recipeName: 'Scrambled eggs',
    id_ingredients: ['eggs'],
  },

  {
    id_recipeName: 'Homemade pizza',
    id_ingredients: [
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
	CREATE TABLE junctionTableRecipes( id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
		id_recipeName INT REFERENCES recipes(id),
		id_ingredients INT REFERENCES ingredients(id)
		);`;

  for (let i = 0; i < junction.length; i++) {
    const recipeId = await sql`
	SELECT id FROM recipes WHERE recipes.name = ${junction[i].id_recipeName}`;

    for (let j = 0; j < junction[i].id_ingredients.length; j++) {
      const ingredientsId = await sql`SELECT id FROM ingredients WHERE ingredients.name = ${junction[i].id_ingredients[j]}`;
      console.log(recipeId);
      await sql`INSERT INTO junctionTableRecipes (id_recipeName, id_ingredients) VALUES (${recipeId[0].id}, ${ingredientsId[0].id});`;
    }
  }
};

exports.down = async (sql) => {
  await sql`DELETE FROM junctionTableRecipes
`;

  await sql`
	DROP TABLE junctionTableRecipes`;
};
