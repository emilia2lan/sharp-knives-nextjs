import Head from 'next/head';

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

      <section>
        <h1>{recipe.name}</h1>
        <div> {recipe.img} </div>
        <div>Instructions: {recipe.instructions}</div>
        <div> Cooking time: {recipe.cookingTime}</div>
        <div> Prep Time: {recipe.prepTime} €</div>
      </section>
    </>
  );
}

export async function getServerSideProps(context) {
  const { getRecipesId } = await import('../../util/database.js');
  const singleRecipe = context.query.recipeId;
  console.log(context.query, 'context');

  const recipe = await getRecipesId(singleRecipe);

  return {
    props: {
      recipe: recipe || null,
    },
  };
}
