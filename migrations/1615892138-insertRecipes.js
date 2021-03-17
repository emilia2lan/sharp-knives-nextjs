const insertRecipesToRecipesTable = [
  {
    name: 'Mici - the Romanian meat sausages',
    instructions:
      'Place the meat into a bowl. In a separate bowl mix the beer and beef stock, salt and pepper until the salt is dissolved completely. Next add the liquid into the bowl where the meat is and incorporate them. When forming the sausages is indicated to add some oil on your hands to prevent the meat from sticking. After forming the sausages place them on a tray. Make sure the grill is hot enough and place the sausages on the grill (high heat), making sure each side is cooked by turning them evenly. The cooking should not take more than 4 minutes. Serve with fresh bread and mustard. Enjoy!',
    cooking_time: '5',
    prep_time: '15',
    img: '/mici.jpg',
  },

  {
    name: 'Homemade Sushi',
    instructions:
      'Place the seaweed on a bamboo mat, then cover the sheet of seaweed with an even layer of prepared sushi rice. Smooth gently with the rice paddle. Layer salmon, cream cheese, and avocado on the rice, and roll it up tightly. Slice with a sharp knife, and enjoy with soy sauce.',
    cooking_time: '15',
    prep_time: '15',
    img: '/sushi.jpg',
  },

  {
    name: 'Vietnamese Pho soup',
    instructions:
      'Turn the oven broiler to high, and place the baking rack about 8 inches away from the heating elements.  Place the onion and ginger cut-side-up on a baking sheet, and brush with a bit of oil.  Broil for about 7-10 minutes, until the tops of the onion and ginger are slightly charred.  Remove and set aside. Meanwhile, heat the anise, cloves, cinnamon, cardamom and coriander to a large stockpot over medium-high heat for about 3 minutes until fragrant. Add in the charred onion, ginger, stock, and stir to combine. Continue cooking until the broth reaches a simmer. Then reduce heat to medium-low, cover with a lid, and continue to simmer for at least 30 minutes. Strain out (and discard) the onions, ginger and spices.  Stir in the fish sauce and sweetener into the hot broth. Then finally, taste and season the broth with salt as needed. Then cook the noodles separately al dente according to the package instructions. Add a handful of noodles to each individual serving bowl. Portion the steak between each serving bowl. Then ladle the still-simmering hot broth into the serving bowls, being sure to submerge the steak completely so that it gets cooked. Top each bowl with lots and lots of garnishes, and finish with a squeeze of lime juice. Serve immediately!',
    cooking_time: '45',
    prep_time: '30',
    img: '/pho.jpg',
  },

  {
    name: 'Hungarian lángos',
    instructions:
      'In a bowl of a stand mixer, combine flour, salt and sugar. Mix with a spoon. Add yeast. Mix again. Add milk and give it a quick mix with a spoon again. Make sure that all the ingredients are combined. When the dough is ready, cover the bowl with plastic wrap and clean kitchen towel. Let it proof in a warm place until doubled in size (45-60 minutes). When ready, transfer the dough onto a well-floured work top. Divide dough into 4 equal portions. Shape each piece into a smooth ball and place it on a lightly floured board. Cover and let rest another 20 minutes. In a large skillet, heat an inch of canola oil to 350 F. Then flatten and stretch each dough ball to a disc of 8-inch diameter.Fry one lángos at a time for about 2 minutes per side or until golden. Drain on paper towels. Serve hot, rubbed with a cut garlic clove and sprinkled with salt to taste. You can also top with sour cream and shredded cheese. ',
    cooking_time: '5',
    prep_time: '10',
    img: '/langos.jpg',
  },

  {
    name: 'One pot vegan stew with coconut milk',
    instructions:
      'Boil the quinoa with approx. 250 ml water in a suitable saucepan for 10 minutes. Meanwhile, cut the vegetables into small pieces and finely dice the garlic. When the 10 minutes are up, turn the stove down to medium speed and add all the ingredients except for the tomatoes and the sun-dried tomatoes. Cut these into small pieces and add to the pot after another 5 minutes. Simmer for about 15 minutes and season to taste. If you like it spicy, you can add some Tabasco.',
    cooking_time: '45',
    prep_time: '15',
    img: '/vegan_quinoa.jpg',
  },

  {
    name: 'Scrambled eggs',
    instructions:
      'Lightly whisk 2 large eggs, 6 tbsp single cream or full cream milk and a pinch of salt together until the mixture has just one consistency. Heat a small non-stick frying pan for a minute or so, then add a knob of butter and let it melt. Pour in the egg mixture and let it sit, without stirring, for 20 seconds. Stir with a wooden spoon, lifting and folding it over from the bottom of the pan. Let it sit for another 10 seconds then stir and fold again. Repeat until the eggs are softly set and slightly runny in places. Remove from the heat and leave for a moment to finish cooking. Enjoy! ',
    cooking_time: '10',
    prep_time: '10',
    img: '/scramble_eggs.jpg',
  },

  {
    name: 'Homemade pizza',
    instructions:
      'Whisk the warm water, yeast, and granulated sugar together in the bowl of your stand mixer fitted with a dough hook or paddle attachment. Cover and allow to rest for 5 minutes. Add the olive oil, salt, and flour. Beat on low speed for 2 minutes. Turn the dough out onto a lightly floured surface. With lightly floured hands, knead the dough for 3-4 minutes. Lightly grease a large bowl with oil or nonstick spray– just use the same bowl you used for the dough. Place the dough in the bowl, turning it to coat all sides in the oil. Cover the bowl with aluminum foil, plastic wrap, or a clean kitchen towel. Allow the dough to rise at room temperature for 60-90 minutes or until double in size. Preheat oven to 475°F (246°C). Allow it to heat for at least 15-20 minutes as you shape the pizza. Lightly grease baking sheet or pizza pan with nonstick spray or olive oil. Sprinkle lightly with cornmeal, which gives the crust extra crunch and flavor. Highly recommended. When the dough is ready, punch it down to release any air bubbles. Divide the dough in half. On a lightly floured work surface using lightly floured hands or rolling pin, gently flatten the dough into a disc. Place on prepared pan and, using lightly floured hands, stretch and flatten the disc into a 12-inch circle. Lift the edge of the dough up to create a lip around the edges. I simply pinch the edges up to create the rim. If using a pizza stone, place the dough directly on baker’s peels dusted with cornmeal. Cover dough lightly with plastic wrap or a clean kitchen towel and allow to rest for a few minutes as you prepare your pizza toppings.  Top with your favorite toppings and bake for 12-15 minutes.',
    cooking_time: '15',
    prep_time: '195',
    img: '/pizza.jpg',
  },

  {
    name: 'Hungarian lángos',
    instructions: 'zxc ',
    cooking_time: '5',
    prep_time: '10',
    img: '/langos.jpg',
  },
];

exports.up = async (sql) => {
  await sql`
	INSERT INTO recipes
	${sql(
    insertRecipesToRecipesTable,
    'name',
    'instructions',
    'cooking_time',
    'prep_time',
    'img',
  )}
	`;
};

exports.down = async (sql) => {
  await sql`
	DELETE FROM recipes`;
};
