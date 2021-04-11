import 'bootstrap/dist/css/bootstrap.css';

// import '../css/customcss.css';
import {
  useEffect,
  useState,
} from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';

import {
  css,
  Global,
} from '@emotion/react';

import Layout from '../components/Layout';

export default function App({ Component, pageProps }) {
  const [isSessionStateStale, setIsSessionStateStale] = useState(true);
  const [userId, setUserId] = useState(null);
  const [isSessionValid, setIsSessionValid] = useState(false);

  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/is-session-valid');
      const data = await response.json();
      const newValue = data.isSessionValid;
      const userIdProfile = data.userId;

      setUserId(userIdProfile);
      setIsSessionValid(newValue);
      setIsSessionStateStale(false);
    }

    if (isSessionStateStale) fetchData();
  }, [isSessionStateStale, router.pathname]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
          crossOrigin="anonymous"
        />
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
          crossOrigin="anonymous"
        />
      </Head>

      <Global
        styles={css`
          html,
          body {
            margin: 0;
            min-height: 100%;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen;
          }
        `}
      />
      <Layout isSessionValid={isSessionValid}>
        <Component
          {...pageProps}
          setIsSessionStateStale={setIsSessionStateStale}
          isSessionValid={isSessionValid}
          userId={userId}
        />
      </Layout>
    </>
  );
}
