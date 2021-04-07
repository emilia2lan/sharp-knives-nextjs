import {
  Dispatch,
  SetStateAction,
  useState,
} from 'react';

import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

type Props = {
  csrfToken: string;
  setIsSessionStateStale: Dispatch<SetStateAction<boolean>>;
};

export default function Login(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Error[]>([]);
  const router = useRouter();

  return (
    <>
      <Head>
        <link rel="logo" href="/logoSharpKnives.svg" />
      </Head>

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

          const { errors: returnedErrors } = await response.json();
          if (returnedErrors) {
            setErrors(returnedErrors);
            return;
          }

          const returnTo = Array.isArray(router.query.returnTo)
            ? router.query.returnTo[0]
            : router.query.returnTo;

          router.push(returnTo || `/recipes`);
          props.setIsSessionStateStale(true);
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
  const { getSessionByToken, deleteAllExpiredSessions } = await import(
    '../util/database'
  );
  const { createSessionWithCookie } = await import('../util/sessions');

  let session = await getSessionByToken(context.req.cookies.session);
  // if the user has already a valid cookie, it gets redirected to homepage and does not allow visiting the login page
  if (session?.userId) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  await deleteAllExpiredSessions();

  if (!session) {
    const result = await createSessionWithCookie();
    session = result.session;
    context.res.setHeader('Set-Cookie', result.sessionCookie);
  }

  const csrfToken = createCsrfToken(session.token);

  return {
    props: { csrfToken: csrfToken },
  };
}