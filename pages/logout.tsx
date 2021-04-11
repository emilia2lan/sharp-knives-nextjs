import {
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';

import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';

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

      <h1>Sorry to see you go... You logged out successfully</h1>
      <Image
        className="backgroundImage"
        src="/logout.jfif"
        alt="a picture of the final result of the recipe"
        width={450}
        height={300}
      />
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
