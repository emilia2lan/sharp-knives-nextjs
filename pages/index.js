import { useState } from 'react';

import Head from 'next/head';

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

      <section>
        <p>Here is home page</p>
        <div>{randomRecipe.name}</div>
      </section>

      {/* <Image
        className="image"
        src="/sharpKnives.jpeg"
        alt="a picture of the final result of the recipe"
        width={320}
        height={320}
      /> */}

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
