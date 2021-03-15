import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '../components/Layout';
import { Error } from '../util/types';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Error[]>([]);
  const router = useRouter();

  return (
    <>
      <Layout>
        <Head>
          <link rel="logo" href="/logoSharpKnives.svg" />
        </Head>
      </Layout>
      <section>
        <p>Here is register page</p>
      </section>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
          });

          const { user, errors: returnedErrors } = await response.json();
          if (returnedErrors) {
            setErrors(returnedErrors);
            return;
          }
          router.push(`/profile/${user.id}`);
        }}
      >
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
      {errors.map((error) => (
        <div style={{ color: 'red' }} key={`error-message-${error.message}`}>
          {' '}
          {error.message}
        </div>
      ))}
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const {
    createSessionFiveMinutesExpiry,
    deleteAllExpiredSessions,
  } = await import('../util/database');

  const { serializeSecureCookieServerSide } = await import('../util/cookies');

  await deleteAllExpiredSessions();

  // uses the same token for the five minutes interval
  const token =
    context.req.cookies.session ||
    (await createSessionFiveMinutesExpiry()).token;
  console.log('token', token);
  const sessionCookie = serializeSecureCookieServerSide(
    'session',
    token,
    60 * 5,
  );

  context.res.setHeader('Set-Cookie', sessionCookie);

  return {
    props: {},
  };
}
