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
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  div {
    flex-flow: column nowrap;
  }

  .image {
    border-radius: 20px;
  }
  a {
    text-decoration: none;
    justify-content: space-evenly;
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
      <h3 style={{ paddingLeft: '20px' }}>
        Hi {props.user.username}, <br />
        here are your favorite recipes:
      </h3>

      <section css={section}>
        {props.favorites.map((recipe) => {
          return (
            <div key={recipe.recipesId}>
              <Image
                className="image"
                src={recipe.img}
                alt="a picture of the final result of the recipe"
                width={300}
                height={300}
              />
              <div>
                <Link
                  className="link"
                  key={recipe.recipesId}
                  href={`/recipes/${recipe.recipesId}`}
                >
                  <a>{recipe.name}</a>
                </Link>{' '}
              </div>
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
