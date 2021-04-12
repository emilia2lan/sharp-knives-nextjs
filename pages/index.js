import { useState } from 'react';

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button } from '@material-ui/core';

const section = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const card = css`
  display: flex;
  flex-direction: column;
  margin: 20px;
  object-fit: cover;
  font-family: sans-serif;
  justify-content: center;
  border-radius: 20px;
  width: 450px;
  max-width: 400px;
  max-height: 600px;
  border: 2px solid #0099cc;
  align-items: center;

  .image {
    border-radius: 20px;
    border: 2px solid red;
  }
  a {
    padding: 15px;
    text-decoration: none;
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
      <div css={section}>
        <div css={card}>
          <p>Looking for ideas? Hit the button...</p>
          <Image
            className="image"
            src={randomRecipe.img}
            alt="a picture of the final result of the recipe"
            width={320}
            height={320}
          />{' '}
          <Link className="link" href={`./recipes/${randomRecipe.id}`}>
            <a>{randomRecipe.name}</a>
          </Link>
        </div>

        <Button
          variant="contained"
          color="default"
          style={{
            maxWidth: '250px',
            backgroundColor: '#0099cc',
            color: 'white',
          }}
          onClick={() => {
            getRandomRecipe();
          }}
        >
          Random recipe!
        </Button>
      </div>
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
