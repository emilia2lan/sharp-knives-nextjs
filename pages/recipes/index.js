import {
  useEffect,
  useState,
} from 'react';

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { TextField } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';

import {
  getFavorite,
  getUserByToken,
} from '../../util/database.js';

const searchBar = css`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  div {
    flex-flow: column nowrap;
  }
`;

const section = css`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin: 20px;
  margin-left: 30px;

  .favoriteButton {
    position: relative;
    min-height: 50px;
  }
  .image {
    border-radius: 20px;
  }

  a {
    text-decoration: none;
    justify-content: space-evenly;
  }
`;

export default function Recipes(props) {
  const [
    recipesWithIngredientsState,
    setRecipesWithIngredientsState,
  ] = useState([]);

  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();
  const [favorites, setFavorites] = useState(props.favorites);
  async function handleClickFavorite(recipeId, userId) {
    const containFavorite = favorites.find((favorite) => {
      return favorite.userId === userId && favorite.recipesId === recipeId;
    });

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
      const favoritesFiltered = favorites.filter((favorite) => {
        return (
          favorite.userId === deleteFavorite.userId &&
          favorite.recipesId !== deleteFavorite.recipeId
        );
      });

      setFavorites(favoritesFiltered);
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
      const copyFavorites = [...favorites];
      copyFavorites.push(addFavorite);
      setFavorites(copyFavorites);
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

      <div css={searchBar}>
        <h3>Today`s featured recipes</h3>
        <TextField
          id="standard-basic"
          label="Search..."
          type="text"
          value={searchValue}
          onChange={(event) => {
            setSearchValue(event.target.value);
          }}
          name="searchBar"
        />{' '}
      </div>

      <div css={section}>
        {recipesWithIngredientsState.map((recipe) => (
          <div key={recipe.name}>
            <Image
              className="image"
              src={recipe.img}
              alt="a picture of the final result of the recipe"
              width={350}
              height={350}
            />
            <div className="favoriteButton">
              <button
                type="button"
                style={{
                  position: 'absolute',
                  right: '5px',
                  backgroundColor: 'white',
                  border: '0px',
                }}
                onClick={() => {
                  if (!props.isSessionValid) {
                    alert('To add to favorite you have to log in');
                    router.push('/login');
                    return;
                  }
                  handleClickFavorite(recipe.id, props.userId);
                }}
              >
                {favorites.find((favorite) => {
                  return favorite.recipesId === recipe.id;
                }) ? (
                  <FavoriteIcon color="secondary" />
                ) : (
                  <FavoriteIcon color="action" />
                )}
              </button>
              <Link className="link" href={`/recipes/${recipe.id}`}>
                {recipe.name}
              </Link>
            </div>
          </div>
        ))}
      </div>
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
  let favorites;
  if (!user) {
    favorites = [];
  } else if (user) {
    favorites = await getFavorite(user.userId);
  }

  // const favorites = await getFavorite(user.userId);
  return {
    props: {
      recipes: recipesWithoutIngredients,
      fullRecipes: ingredientsAndRecipe,
      userId: user ? user.userId : null,
      favorites: favorites,
    },
  };
}
