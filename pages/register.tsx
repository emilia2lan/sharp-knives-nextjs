import {
  Dispatch,
  SetStateAction,
  useState,
} from 'react';

import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

import styled from '@emotion/styled';
import {
  Button,
  TextField,
} from '@material-ui/core';

import { Error } from '../util/types';

type Props = {
  setIsSessionStateStale: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
};

const LayoutWrapper = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  .backgroundImage {
    border-radius: 20px;
  }
`;

const LayoutWrapperTwo = styled('div')`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
`;
const LayoutWrapperTree = styled('div')`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
`;
export default function Register(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Error[]>([]);
  const router = useRouter();

  return (
    <>
      <Head>
        <link rel="logo" href="/logoSharpKnives.svg" />
      </Head>
      <LayoutWrapper>
        {props.children}
        <Image
          className="backgroundImage"
          src="/register.jfif"
          alt="a picture of the final result of the recipe"
          width={600}
          height={400}
        />
        <LayoutWrapperTwo>
          <h3> Please Register </h3>

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

              const { errors: returnedErrors } = await response.json();
              if (returnedErrors) {
                setErrors(returnedErrors);
                return;
              }

              const returnTo = Array.isArray(router.query.returnTo)
                ? router.query.returnTo[0]
                : router.query.returnTo;

              router.push(returnTo || `/login`);
              props.setIsSessionStateStale(true);
            }}
          >
            <div>
              <TextField
                id="outlined-basic"
                label="Username"
                variant="outlined"
                style={{
                  marginBottom: '15px',
                }}
                value={username}
                onChange={(event) => setUsername(event.currentTarget.value)}
              />
            </div>
            <div>
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                style={{
                  marginBottom: '15px',
                }}
                type="password"
                value={password}
                onChange={(event) => setPassword(event.currentTarget.value)}
              />
            </div>
            <LayoutWrapperTree>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{
                  maxWidth: '120px',
                  backgroundColor: '#0099cc',
                  color: 'white',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                Register
              </Button>
            </LayoutWrapperTree>
          </form>
          {errors.map((error) => (
            <div
              style={{ color: 'red' }}
              key={`error-message-${error.message}`}
            >
              {' '}
              {error.message}
            </div>
          ))}
        </LayoutWrapperTwo>
      </LayoutWrapper>
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
  if (
    context.req.headers.host &&
    context.req.headers['x-forwarded-proto'] &&
    context.req.headers['x-forwarded-proto'] !== 'https'
  ) {
    return {
      redirect: {
        destination: `https://${context.req.headers.host}/login`,
        permanent: true,
      },
    };
  }

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
