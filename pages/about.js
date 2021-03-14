import Head from 'next/head';
import Layout from '../components/Layout';

export default function About() {
  return (
    <>
      <Layout>
        <Head>
          <link rel="logo" href="/logoSharpKnives.svg" />
        </Head>
      </Layout>
      <section>
        <p>Here are is about page</p>
      </section>
    </>
  );
}
