import Head from 'next/head';
import Image from 'next/image';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const section = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  grid-gap: 15px;
  margin: 20px;

  justify-content: center;
  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
    grid-template-rows: 150px 300px 1fr;
    margin: 50px 30px;
  }
  @media (max-width: 500px) {
    margin: 50px 0;
  }
  .instructions {
    grid-column: 2 / 2;
    grid-row: 1 / 2;
  }
  .ingredients {
    grid-column: 2 / 2;
    grid-row: 2 / 2;
  }
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

      <h3>{recipe.name}</h3>
      <section css={section}>
        <Image
          src={recipe.image}
          alt="a picture of the final result of the recipe"
          width={350}
          height={350}
        />
        <ul className="ingredients">
          {' '}
          Ingredients{' '}
          {recipe.ingredients.map((i) => {
            return <li key={i}>{i}</li>;
          })}
        </ul>
        <p className="instructions"> Instructions: {recipe.instructions}</p>
        <p> Cook: {recipe.cookingTime} mins</p>
        <p> Prep: {recipe.prepTime} mins</p>
      </section>
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
