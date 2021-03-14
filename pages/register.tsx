import Head from 'next/head';
import { useState } from 'react';
import Layout from '../components/Layout';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
      <form onSubmit={() => {}}>
        <label>
          username:
          <input
            value={username}
            onChange={(event) => setUsername(event.currentTarget.value)}
          />
        </label>
        <label>
          password:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
        </label>
        <button type="submit">Register</button>
      </form>
    </>
  );
}

export async function getServerSideProps() {
  const { getUserName } = await import('../util/database');

  const userName = await getUserName();
  return {
    props: {
      //watches:watches
    },
  };
}
