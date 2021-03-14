import Head from 'next/head';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <>
      <Layout>
        <Head>
          <link rel="logo" href="/logoSharpKnives.svg" />
        </Head>
      </Layout>
      <section>
        <p>Here are your favorite recipes</p>
      </section>
    </>
  );
}
