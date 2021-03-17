import Head from 'next/head';
import Link from 'next/link';

export default function Recipes(props) {
  return (
    <>
      <Head>
        <link rel="logo" href="/logoSharpKnives.svg" />
      </Head>

      <section>
        <p>Here are your favorite recipes</p>
      </section>
      <div>
        {props.recipes.map((recipe) => (
          <div key={recipe.id}>
            <h1>{recipe.name}</h1>
            <p>{recipe.img}</p>
            <Link href={`/recipes/${recipe.id}`}>{recipe.name}</Link>
          </div>
        ))}
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const { getRecipes } = await import('../util/database.js');
  const recipes = await getRecipes();

  return {
    props: { recipes: recipes },
  };
}
