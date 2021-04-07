import Head from 'next/head';

import {
  getFavoriteRecipesUser,
  getRecipesAndIngredients,
} from '../../util/database';

export default function Profile(props) {
  if (!props.user) {
    return (
      <>
        <Head>
          <title>{props.errors[0].message}</title>
        </Head>
        <h1>{props.errors[0].message}</h1>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>User Profile: {props.user.username}</title>
      </Head>
      <h1>User: {props.user.username}</h1>
      <h3>id: {props.user.id}</h3>
      {props.favorites.map((recipe) => {
        return <div key={recipe.id}>{recipe.recipesId}</div>;
      })}
    </>
  );
}

// here you get the to the specific page of each user and is shown the username and the id
export async function getServerSideProps(context) {
  const { getUserById, getSessionByToken } = await import(
    '../../util/database'
  );

  const session = await getSessionByToken(context.req.cookies.session);

  if (!session || session.userId !== Number(context.query.userId)) {
    return {
      props: {
        user: null,
        errors: [{ message: 'Access denied' }],
      },
    };
  }

  const user = await getUserById(context.query.userId);
  const ingredientsAndRecipe = await getRecipesAndIngredients();

  const favorites = await getFavoriteRecipesUser(user.id);

  return {
    props: {
      user: user,
      fullRecipes: ingredientsAndRecipe,
      favorites: favorites,
    },
  };
}
