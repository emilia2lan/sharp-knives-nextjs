import { getRecipes } from '../../util/database.js';

export default async function handler(req, res) {
  const recipes = await getRecipes();

  const keys = Object.keys(recipes);
  const randomRecipe = keys[Math.floor(Math.random() * keys.length)];
  const item = recipes[randomRecipe];

  res.send({ item: item });
}
