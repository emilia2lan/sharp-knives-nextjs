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
  return (
    <>
      <Head>
        <link rel="logo" href="/logoSharpKnives.svg" />
      </Head>

      <h1>Here are your favorite recipes</h1>

      <section css={section}>
        {props.recipes.map((recipe) => (
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

        {/* {props.ingredients.map((i) => {
          return <div key={i.id}> {i.name} </div>;
        })} */}
      </section>
    </>
  );
}

export async function getServerSideProps() {
  const { getAllRecipes, getRecipes } = await import('../../util/database.js');

  const recipes = await getRecipes();
  const searchIngredients = await getAllRecipes();

  // const ingredients = await getIngredients();

  return {
    props: { recipes: recipes, searchIngredients: searchIngredients },
  };
}
