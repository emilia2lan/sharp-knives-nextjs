import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button } from '@material-ui/core';

export default function About() {
  const router = useRouter();

  const about = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 20px;
    div {
      flex-direction: column;
      text-align: justify;
      text-justify: inter-word;
      max-width: 550px;
      margin-left: 30px;
    }
    .backgroundImage {
      border-radius: 20px;
    }
  `;
  return (
    <>
      <Head>
        <link rel="logo" href="/logoSharpKnives.svg" />
      </Head>

      <div css={about}>
        <Image
          className="backgroundImage"
          src="/random.jpg"
          alt="a picture of the final result of the recipe"
          width={600}
          height={400}
        />
        <div>
          Hello there and thank you for checking our recipes website! We try our
          best to have the sharpest knives. After tedious days in our kitchens
          experimenting a various variety of recipes, we finally brought it all
          together in one page so that you can just simply grab it and prepare
          it a delicious meal. Our recipes are easy to follow, the ingredients
          and instructions are readable at a glance so you don`t get lost.
          Everyday we come up with new recipes, enabling you to cook with the
          most diverse kitchen experience using Sharp Knives. Stay tuned for
          more. Your Sharp Knives Team.
          <div>
            <Button
              variant="contained"
              color="default"
              style={{
                maxWidth: '120px',
                backgroundColor: '#0099cc',
                color: 'white',
                alignItems: 'center',
                marginTop: '20px',
                marginRight: '0px',
                textAlign: 'center',
              }}
              onClick={() => {
                alert('Thank you!You have successfully subscribed.');
                router.push('./');
              }}
            >
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
