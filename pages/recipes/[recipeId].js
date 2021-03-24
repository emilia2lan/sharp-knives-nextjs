import Head from 'next/head';
import Image from 'next/image';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const section = css`
  display: flex;
  margin: 25px;
`;

export default function GetRecipe(props) {
  const recipe = props.recipe;
  if (recipe === null) {
    return <div>Recipe not found!</div>;
  }

  return (
    <>
      <Head>
        <link rel="logo" href="/logoSharpKnives.svg" />
      </Head>

      <div css={section}>
        <section className="container">
          <h1>{recipe.name}</h1>
          <Image
            src={recipe.image}
            alt="a picture of the final result of the recipe"
            width={500}
            height={500}
          />
          <p> Instructions: {recipe.instructions}</p>
          <p> Cooking time: {recipe.cookingTime}</p>
          <p> Prep Time: {recipe.prepTime}</p>
          <ul>
            {' '}
            {recipe.ingredients.map((i) => {
              return <li key={i}>{i}</li>;
            })}
          </ul>
        </section>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { getRecipeWithIngredients } = await import('../../util/database.js');
  const recipeId = context.query.recipeId;

  const fullRecipe = await getRecipeWithIngredients(recipeId);
  return {
    props: {
      recipe: fullRecipe,
    },
  };
}
