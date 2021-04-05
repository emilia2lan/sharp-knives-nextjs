import { addFavorite } from '../../util/database';

export default async function handler(req, res) {
  const { recipeId, userId } = req.body;

  const addFavoriteRecipe = await addFavorite(userId, recipeId);
  res.status(200).send(addFavoriteRecipe);
}
