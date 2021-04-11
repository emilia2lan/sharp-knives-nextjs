import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function About() {
  const router = useRouter();

  return (
    <>
      <Head>
        <link rel="logo" href="/logoSharpKnives.svg" />
      </Head>

      <section>
        <p>
          Hello there and thank you for checking our recipes website! We try our
          best to have the sharpest knives. After tedious days in our kitchens
          experimenting a various variety of recipes, we finally brought it all
          together in one page so that you can just simply grab it and prepare
          it a delicious meal. Our recipes are easy to follow, the ingredients
          and instructions are readable at a glance so you don`t get lost.
          Everyday we come up with new recipes, enabling you to cook with the
          most diverse kitchen experience using Sharp Knives. Stay tuned for
          more. Your Sharp Knives Team.
        </p>

        <button
          type="button"
          onClick={() => {
            alert('You have successfully subscribed');
            router.push('./');
          }}
        >
          Subscribe
        </button>

        <Image
          className="backgroundImage"
          src="/random.jpg"
          alt="a picture of the final result of the recipe"
          width={450}
          height={300}
          resizeMode
        />
      </section>
    </>
  );
}
