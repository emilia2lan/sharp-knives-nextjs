import { deleteFavorite } from '../../util/database';

export default async function handler(req, res) {
  const { recipeId, userId } = req.body;

  const deleteFavoriteRecipe = await deleteFavorite(userId, recipeId);
  res.status(200).send({ userId: userId, recipeId: recipeId });
  return deleteFavoriteRecipe;
}
