import {
  useEffect,
  useState,
} from 'react';

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import {
  getFavorite,
  getUserByToken,
} from '../../util/database.js';

const section = css`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  margin: 25px;
  object-fit: cover;
`;
export default function Recipes(props) {
  const [
    recipesWithIngredientsState,
    setRecipesWithIngredientsState,
  ] = useState([]);

  const [searchValue, setSearchValue] = useState('');

  const [favorites, setFavorites] = useState(props.favorites);

  async function handleClickFavorite(recipeId, userId) {
    console.log(favorites, 'fav');
    const containFavorite = favorites.find((favorite) => {
      return favorite.userId === userId && favorite.recipesId === recipeId;
    });
    console.log(containFavorite, 'contain fv');
    if (containFavorite) {
      const response = await fetch('/api/delete-favorite', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipeId,
          userId,
        }),
      });

      const deleteFavorite = await response.json();

      console.log(deleteFavorite, 'deletefv');
      setFavorites(
        favorites.filter((favorite) => {
          return (
            favorite.userId !== deleteFavorite.userId &&
            favorite.recipesId !== deleteFavorite.recipesId
          );
        }),
      );
    } else {
      const response = await fetch('/api/add-favorite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipeId,
          userId,
        }),
      });

      const addFavorite = await response.json();
      console.log(addFavorite, 'addefv');
      favorites.push(addFavorite);
    }
  }

  useEffect(() => {
    const entireRecipes = props.recipes
      .map((recipe) => {
        recipe.ingredients = props.fullRecipes
          .map((fullRecipe) => {
            if (fullRecipe.r_name === recipe.name) {
              return fullRecipe.i_name;
            }
            return undefined;
          })
          .filter((r) => r !== undefined);

        return recipe;
      })

      .filter((fullRecipe) => {
        return (
          fullRecipe.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          fullRecipe.ingredients.find((ingredient) => {
            return ingredient.toLowerCase().includes(searchValue.toLowerCase());
          })
        );
      });

    setRecipesWithIngredientsState(entireRecipes);
  }, [props.recipes, props.fullRecipes, searchValue]);

  return (
    <>
      <Head>
        <link rel="logo" href="/logoSharpKnives.svg" />
      </Head>

      <h1>Here are your favorite recipes</h1>
      <input
        type="text"
        value={searchValue}
        onChange={(event) => {
          setSearchValue(event.target.value);
        }}
        name="searchBar"
        id="searchBar"
        placeholder="search for an ingredient"
      />

      <section css={section}>
        {recipesWithIngredientsState.map((recipe) => (
          <div key={recipe.name}>
            <Image
              className="image"
              src={recipe.img}
              alt="a picture of the final result of the recipe"
              width={320}
              height={320}
              resizeMode
            />
            <button
              type="button"
              onClick={() => {
                handleClickFavorite(recipe.id, props.userId);
              }}
            >
              {' '}
              {recipe.id % 2 ? '🖤' : '💖'}{' '}
            </button>
            <h1>
              {' '}
              <Link className="link" href={`/recipes/${recipe.id}`}>
                {recipe.name}
              </Link>
            </h1>
          </div>
        ))}
      </section>
    </>
  );
}

export async function getServerSideProps(context) {
  const { getRecipesAndIngredients, getRecipes } = await import(
    '../../util/database.js'
  );

  const recipesWithoutIngredients = await getRecipes();

  const ingredientsAndRecipe = await getRecipesAndIngredients();
  const nextCookies = require('next-cookies');
  const token = nextCookies(context).session;
  const user = await getUserByToken(token);
  const favorites = await getFavorite(user.userId);
  return {
    props: {
      recipes: recipesWithoutIngredients,
      fullRecipes: ingredientsAndRecipe,
      userId: user.userId,
      favorites: favorites,
    },
  };
}
