import { useState } from 'react';

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const section = css`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 15px;
  margin: 20px;
  object-fit: cover;
  font-family: sans-serif;
  justify-content: center;
  @media (max-width: 1000px) {
    grid-template-columns: 2fr;
    grid-template-rows: 150px 300px 1fr;
    margin: 50px 30px;
  }
  .image {
    grid-column: 2 / 4;
    grid-row: 1 / 2;
    z-index: 2;
    border-radius: 20px;
    @media (max-width: 1000px) {
      grid-column: 2 / 1;
      grid-row: 2 / 2;
      border-radius: 20px 20px 0 0;
      display: flex;
      justify-content: center;
      z-index: 0;
    }
    @media (max-width: 500px) {
      border-radius: 0;
      z-index: 0;
    }
  }
  a {
    text-decoration: none;
    justify-content: center;
    grid-column: 1 / 4;
    grid-row: 2 / 2;
  }
  h3 {
    font-family: sans-serif;
    justify-content: center;
  }
  button {
    grid-column: 3 / 4;
    grid-row: 1 / 2;
  }
`;

export default function Home(props) {
  const [randomRecipe, setRandomRecipe] = useState(props.item);

  async function getRandomRecipe() {
    const random = await fetch('/api/recipe');
    const recipeFromServer = await random.json();
    setRandomRecipe(recipeFromServer.item);
  }

  if (randomRecipe === null) {
    return <div>Please try again!</div>;
  }
  return (
    <>
      <Head>
        <link rel="logo" href="/logoSharpKnives.svg" />
      </Head>
      <h3>Looking for ideas? Hit the button...</h3>
      <section css={section}>
        <Image
          className="image"
          src={randomRecipe.img}
          alt="a picture of the final result of the recipe"
          width={320}
          height={320}
        />{' '}
        <Link className="link" href={`/recipes/${randomRecipe.id}`}>
          <a>{randomRecipe.name}</a>
        </Link>
        <button
          onClick={() => {
            getRandomRecipe();
          }}
        >
          Random recipe!
        </button>
      </section>
    </>
  );
}

export async function getServerSideProps() {
  const { getRecipes } = await import('../util/database.js');
  const recipes = await getRecipes();

  const keys = Object.keys(recipes);
  const randomRecipe = keys[Math.floor(Math.random() * keys.length)];
  const item = recipes[randomRecipe];

  return {
    props: { recipes: recipes, item: item },
  };
}
