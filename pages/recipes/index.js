import {
  useEffect,
  useState,
} from 'react';

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

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
      .filter((fullRecipe) =>
        fullRecipe.name.toLowerCase().includes(searchValue.toLowerCase()),
      );
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
      <button type="submit" value="Search">
        {' '}
        Search
      </button>

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

export async function getServerSideProps() {
  const { getRecipesAndIngredients, getRecipes } = await import(
    '../../util/database.js'
  );

  const recipesWithoutIngredients = await getRecipes();

  const ingredientsAndRecipe = await getRecipesAndIngredients();

  return {
    props: {
      recipes: recipesWithoutIngredients,
      fullRecipes: ingredientsAndRecipe,
    },
  };
}
