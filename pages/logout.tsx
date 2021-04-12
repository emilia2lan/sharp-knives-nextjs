import {
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';

import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import styled from '@emotion/styled';

const LogoutPage = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 20px;
  padding-left: 20px;
  .backgroundImage {
    border-radius: 20px;
    padding-right: 20px;
  }
  p {
    padding-left: 20px;
  }
`;

type Props = {
  setIsSessionStateStale: Dispatch<SetStateAction<boolean>>;
};
export default function Logout(props: Props) {
  useEffect(() => {
    props.setIsSessionStateStale(true);
  }, [props]);
  return (
    <>
      <Head>
        <title> You are logged out successfully</title>
      </Head>
      <h1> </h1>
      <LogoutPage>
        <div>
          <Image
            className="backgroundImage"
            src="/logout.jfif"
            alt="a picture of the final result of the recipe"
            width={600}
            height={400}
          />
        </div>

        <p>
          Sorry to see you go... <br /> You logged out successfully
        </p>
      </LogoutPage>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { deleteSessionByToken } = await import('../util/database');
  const { serializeEmptyCookieServerSide } = await import('../util/cookies');

  await deleteSessionByToken(context.req.cookies.session);
  const emptyCookie = serializeEmptyCookieServerSide('session');
  context.res.setHeader('Set-Cookie', emptyCookie);

  return { props: {} };
}
