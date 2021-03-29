import camelcaseKeys from 'camelcase-keys';
import postgres from 'postgres';

import { generateToken } from './sessions';

require('dotenv-safe').config();

// Connect to PostgresSQL
const sql = postgres();

function camelcaseRecords(records) {
  return records.map((record) => camelcaseKeys(record));
}

// Session table from DB
export async function isSessionTokenNotExpired(sessionToken) {
  const sessions = await sql`
    SELECT
      *
    FROM
      session
    WHERE
      token = ${sessionToken} AND
      expiry > NOW()
  `;
  return sessions.length > 0;
}

export async function createSessionFiveMinutesExpiry() {
  const token = generateToken();
  const sessions = await sql`
  INSERT INTO session(token, expiry)
  VALUES
  (${token}, NOW() + INTERVAL '5 minutes')
  RETURNING *`;
  return camelcaseRecords(sessions)[0];
}
export async function createSessionByUserId(userId) {
  const token = generateToken();

  const sessions = await sql`
    INSERT INTO session
      (token, user_id)
    VALUES
      (${token}, ${userId})
    RETURNING *
  `;

  return camelcaseRecords(sessions)[0];
}

export async function getSessionByToken(sessionToken) {
  if (!sessionToken) {
    return undefined;
  }

  const sessions = await sql`
    SELECT
      *
    FROM
      session
    WHERE
      token = ${sessionToken} AND
      expiry > NOW()
  `;
  return camelcaseRecords(sessions)[0];
}

export async function deleteSessionById(id) {
  const sessions = await sql`
    DELETE FROM
      session
    WHERE
      id = ${id}
    RETURNING *
  `;
  return camelcaseRecords(sessions)[0];
}
export async function deleteSessionByToken(token) {
  const sessions = await sql`
    DELETE FROM
      session
    WHERE
      token = ${token}
    RETURNING *
  `;
  return camelcaseRecords(sessions)[0];
}

export async function deleteAllExpiredSessions() {
  const sessions = await sql`
    DELETE FROM
      session
    WHERE
      expiry < NOW()
    RETURNING *
  `;
  return camelcaseRecords(sessions)[0];
}

// User table from BD
export async function getUserById(id) {
  const users = await sql`
    SELECT
      id,
      username
    FROM
      users
    WHERE
      id = ${id}
  `;
  return camelcaseRecords(users)[0];
}

export async function getUserByUsername(username) {
  const users = await sql`
    SELECT
      username
    FROM
      users
    WHERE
      username = ${username}
  `;
  return camelcaseRecords(users)[0];
}

export async function getUserWithHashedPasswordByUsername(username) {
  const users = await sql`
    SELECT
     *
    FROM
      users
    WHERE
      username = ${username}
  `;
  return camelcaseRecords(users)[0];
}
export async function createUser(username, passwordHash) {
  const users = await sql`
    INSERT INTO users
      (username, password_hash)
    VALUES
      (${username}, ${passwordHash})

    RETURNING id, username
  `;
  return camelcaseRecords(users)[0];
}
// Recipes Table from DB
export async function getRecipes() {
  const recipes = await sql` SELECT * FROM recipes`;
  return camelcaseRecords(recipes);
}

export async function getIngredients() {
  const ingredients = await sql` SELECT * FROM ingredients`;
  return ingredients;
}

export async function getRecipesId(id) {
  const singleRecipe = await sql` SELECT * FROM
      recipes
    WHERE
      id = ${id}`;

  return camelcaseRecords(singleRecipe)[0];
}

export async function getRecipeWithIngredients(id) {
  const ingredients = await sql` SELECT
  j.id,
  r.name as r_name,
  i.name as i_name
FROM
  recipes_ingredients as j,
  ingredients as i,
  recipes as r
WHERE
  j.recipename = r.id
AND
  j.ingredients = i.id
AND
  j.recipename = ${id}
  `;

  const recipe = await sql`
  SELECT * FROM recipes WHERE recipes.id = ${id}
  `;

  const fullRecipe = {
    id: recipe[0].id,
    name: recipe[0].name,
    instructions: recipe[0].instructions,
    cookingTime: recipe[0].cooking_time,
    prepTime: recipe[0].prep_time,
    image: recipe[0].img,

    ingredients: ingredients.map((i) => {
      return i.i_name;
    }),
  };

  return fullRecipe;
}

// export async function getAllRecipes() {
//   const allRecipes = await sql` SELECT
//   recipename,
//   instructions,
//   cooking_time,
//   prep_time,
//   img,
//   json_agg(ingredients)
//   FROM
//   recipes_ingredients,
//   recipes
//  GROUP BY recipename,
//  instructions, cooking_time, prep_time, img;`;

//   return allRecipes;
// }

export async function getIngredientsBySearch(searchQuery) {
  const searchedIngredient = await sql` SELECT
  j.id,
  r.name as r_name,
  i.name as i_name
FROM
  recipes_ingredients as j,
  ingredients as i,
  recipes as r
WHERE
  j.recipename = r.id
AND
  j.ingredients = i.id
AND
LOWER(i.name) LIKE LOWER(${`%${searchQuery}%`});`;

  return searchedIngredient;
}

export async function getRecipesAndIngredients() {
  const searchedIngredientAndRecipes = await sql` SELECT
  j.id,
  r.name as r_name,
  i.name as i_name
FROM
  recipes_ingredients as j,
  ingredients as i,
  recipes as r
WHERE
  j.recipename = r.id
AND
  j.ingredients = i.id
`;

  return searchedIngredientAndRecipes;
}
