import {
  useEffect,
  useState,
} from 'react';

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
