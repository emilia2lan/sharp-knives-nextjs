import { addFavorite } from '../../util/database';

export default async function handler(req, res) {
  const { recipeId, userId } = req.body;

  const addFavoriteRecipe = await addFavorite(userId, recipeId);
  console.log(addFavoriteRecipe);
  res.status(200).send({});
}
