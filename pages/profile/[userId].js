import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import {
  getRecipesAndIngredients,
  getRecipesAndIngredientsSetFavoriteUser,
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

      {props.favorites.map((recipe) => {
        console.log('recipe', recipe);
        return (
          <div key={recipe.recipesId}>
            <Image src={recipe.img} alt="" width={300} height={300} />
            <Link
              className="link"
              key={recipe.recipesId}
              href={`/recipes/${recipe.recipesId}`}
            >
              <a>{recipe.name}</a>
            </Link>{' '}
          </div>
        );
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

  const favorites = await getRecipesAndIngredientsSetFavoriteUser(user.id);

  return {
    props: {
      user: user,
      fullRecipes: ingredientsAndRecipe,
      favorites: favorites,
    },
  };
}
