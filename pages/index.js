import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Head>
        <link rel="logo" href="/logoSharpKnives.svg" />
      </Head>

      <section>
        <p>Here is home page</p>
      </section>
      <Image
        className="image"
        src="/sharpKnives.jpeg"
        alt="a picture of the final result of the recipe"
        width={1000}
        height={1000}
      />
    </>
  );
}
