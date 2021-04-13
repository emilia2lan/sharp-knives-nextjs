import Head from 'next/head';
import Image from 'next/image';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import AvTimerIcon from '@material-ui/icons/AvTimer';

const section = css`
  display: flex;
  flex-flow: row;
  justify-content: center;
  padding: 5px;
  flex-basis: max-content;


  .image {
    border-radius: 20px;
    margin: 20px;
    justify-content: center;
    border: 30px solid #0099cc;
    border-radius: 20px;
  }

  .instructions {
    flex-basis: max-content;
    box-shadow: 3px 3px #0099cc;
    padding: 20px;
    flex-flow: column;
    justify-content: right;
    max-width: 500px;
    border: 1px solid #0099cc;
    border-radius: 20px;

    padding: 25px;
    margin: 20px;
    text-align: justify;
    text-justify: inter-word;
  }

  .ingredients {
    margin-left: 1px;
    span {
      margin-left: 2px;
    }
  }
`;

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

      <div css={section}>
        <div className="instructions">
          {' '}
          <em>
            {' '}
            <strong>Instructions: </strong>{' '}
          </em>{' '}
          <br />
          {recipe.instructions}
          <p className="ingredients">
            <p>
              {' '}
              <em>
                {' '}
                <strong> Ingredients:</strong>
              </em>
            </p>{' '}
            {recipe.ingredients.map((i) => {
              return (
                <span className="li" key={i}>
                  {i}, &nbsp;&nbsp;
                </span>
              );
            })}
            <br />
          </p>
          <p>
            <AvTimerIcon color="primary" />
            <span> Cook: {recipe.cookingTime} min |</span>{' '}
            <span> Prep: {recipe.prepTime} min </span>
          </p>
        </div>
        <div>
          <h3 style={{ textAlign: 'center', paddingTop: '20px' }}>
            {recipe.name}
          </h3>
          <Image
            className="image"
            src={recipe.image}
            alt="a picture of the final result of the recipe"
            width={300}
            height={300}
          />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { getRecipeWithIngredients } = await import('../../util/database.js');

  const recipeId = context.query.recipeId;

  const fullRecipe = await getRecipeWithIngredients(recipeId);

  return {
    props: {
      recipe: fullRecipe,
    },
  };
}
