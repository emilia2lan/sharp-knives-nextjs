import { useState } from 'react';

import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Layout from '../components/Layout';

type Props = {
  csrfToken: string;
};

export default function Login(props: Props) {
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
        <p>Here is Login page</p>
      </section>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username,
              password,
              csrfToken: props.csrfToken,
            }),
          });

          const { user, errors: returnedErrors } = await response.json();
          if (returnedErrors) {
            setErrors(returnedErrors);
            return;
          }
          // here renders the user profile page
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
        <button type="submit">Login</button>
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
  const { createCsrfToken } = await import('../util/auth');
  const { getValidSessionToken } = await import('../util/sessions');

  const { deleteAllExpiredSessions } = await import('../util/database');

  // clears the DB from expired sessions/tokens
  await deleteAllExpiredSessions();

  const { sessionToken, sessionCookie } = await getValidSessionToken(
    context.req.cookies.session,
  );

  if (sessionCookie) {
    context.res.setHeader('Set-Cookie', sessionCookie);
  }

  const csrfToken = createCsrfToken(sessionToken);

  return {
    props: { csrfToken: csrfToken },
  };
}
