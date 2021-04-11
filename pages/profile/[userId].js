import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import {
  getRecipesAndIngredients,
  getRecipesAndIngredientsSetFavoriteUser,
} from '../../util/database';

const section = css`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 15px;
  margin: 20px;
  object-fit: cover;
  font-family: sans-serif;
  justify-content: center;
  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
    grid-template-rows: 150px 300px 1fr;
    margin: 50px 30px;
  }
  .image {
    grid-column: 1 / 3;
    grid-row: 3 / 4;
    background-color: #fafcff;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    z-index: 2;
    border-radius: 20px;

    @media (max-width: 1000px) {
      grid-column: 1 / 1;
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
`;
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

      <h1>Hi {props.user.username}, here are your favorite recipes</h1>
      <section css={section}>
        {props.favorites.map((recipe) => {
          return (
            <div key={recipe.recipesId}>
              <Image
                className="image"
                src={recipe.img}
                alt="a picture of the final result of the recipe"
                width={350}
                height={350}
              />
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
      </section>
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
