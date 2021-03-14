import Head from 'next/head';
import Layout from '../components/Layout';

export default function Login() {
  return (
    <>
      <Layout>
        <Head>
          <link rel="logo" href="/logoSharpKnives.svg" />
        </Head>
      </Layout>
      <section>
        <p>Here is login page</p>
      </section>
    </>
  );
}
