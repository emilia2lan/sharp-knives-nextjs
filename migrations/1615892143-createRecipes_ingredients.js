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
      'salmon',
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
  {
    recipeName: 'Speckled Trout in capers and white wine',
    ingredients: [
      'speckled trout',
      'capers',
      'butter',
      'white cooking wine',
      'fresh parsley',
    ],
  },

  {
    recipeName: 'Garlic chicken thighs',
    ingredients: ['chicken thighs', 'butter', 'honey', 'garlic', 'oregano'],
  },
  {
    recipeName: 'Quick beef stir-fry',
    ingredients: [
      'vegetable oil',
      'beef sirloin',
      'broccoli',
      'red bell pepper',
      'carrots',
      'green onion',
      'sesame seeds',
      'garlic',
      'soy sauce',
    ],
  },

  {
    recipeName: 'Cherry berry cheesecake dessert',
    ingredients: [
      'graham cracker crumbs',
      'butter',
      'powdered sugar',
      'cream cheese',
      'cherry',
    ],
  },

  {
    recipeName: 'Raspberry Muffins',
    ingredients: [
      'all purpose flour',
      'sugar',
      'baking powder',
      'salt',
      'butter',
      'milk',
      'eggs',
      'vanilla extract',
      'raspberries',
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
