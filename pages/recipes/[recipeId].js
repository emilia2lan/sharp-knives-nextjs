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
            src={recipe.img}
            alt="a picture of the final result of the recipe"
            width={500}
            height={500}
          />
          <p> Instructions: {recipe.instructions}</p>
          <p> Cooking time: {recipe.cookingTime}</p>
          <p> Prep Time: {recipe.prepTime}</p>
        </section>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { getRecipesId } = await import('../../util/database.js');
  const singleRecipe = context.query.recipeId;

  const recipe = await getRecipesId(singleRecipe);

  return {
    props: {
      recipe: recipe || null,
    },
  };
}
