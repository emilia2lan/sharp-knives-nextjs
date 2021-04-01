import { getFavorite } from '../../util/database';

export default async function handler(req, res) {
  const isFavorite = await getFavorite();
  res.send({ isFavorite: isFavorite });
}
