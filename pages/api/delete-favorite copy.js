import { deleteFavorite } from '../../util/database';

export default async function handler(req, res) {
  const { recipeId, userId } = req.body;

  const deleteFavoriteRecipe = await deleteFavorite(userId, recipeId);
  console.log(deleteFavoriteRecipe);
  res.status(200).send({ userId: userId, recipeId: recipeId });
}
