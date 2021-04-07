import { useState } from 'react';

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function Home(props) {
  const [randomRecipe, setRandomRecipe] = useState(props.item);
  console.log(randomRecipe, 'random');
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

      <section>
        <p>Here is home page</p>
        <Image
          className="image"
          src={randomRecipe.img}
          alt="a picture of the final result of the recipe"
          width={320}
          height={320}
        />
        <Link className="link" href={`/recipes/${randomRecipe.id}`}>
          <a>{randomRecipe.name}</a>
        </Link>
      </section>

      <button
        onClick={() => {
          getRandomRecipe();
        }}
      >
        Random recipe!
      </button>
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
