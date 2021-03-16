import { useState } from 'react';

import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Layout from '../components/Layout';
import { isSessionTokenNotExpired } from '../util/database';

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
  const { default: Tokens } = await import('csrf');
  const tokens = new Tokens();
  const {
    createSessionFiveMinutesExpiry,
    deleteAllExpiredSessions,
  } = await import('../util/database');

  const { serializeSecureCookieServerSide } = await import('../util/cookies');

  // clears the DB from expired sessions/tokens
  await deleteAllExpiredSessions();
  // Assume that the session cookie is NOT valid.
  let isSessionCookieValid = false;
  let sessionToken = context.req.cookies.session;

  // checks if the session cookie is valid and NOT expired
  if (sessionToken) {
    isSessionCookieValid = await isSessionTokenNotExpired(sessionToken);
  }
  // if the cookie does NOT exists/valid, it creates a NEW token per session which expires in 5 minutes
  if (!isSessionCookieValid) {
    const session = await createSessionFiveMinutesExpiry();
    sessionToken = session.token;

    const sessionCookie = serializeSecureCookieServerSide(
      'sessions',
      sessionToken,
      60 * 5,
    );

    context.res.setHeader('Set-Cookie', sessionCookie);
  }

  // add a level of security to the tokens from sessions
  const secret = sessionToken + process.env.CSRF_SECRET_SALT;
  const token = tokens.create(secret);

  return {
    props: { csrfToken: token },
  };
}
