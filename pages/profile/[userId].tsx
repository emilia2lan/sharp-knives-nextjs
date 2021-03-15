import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { User } from '../../util/types';

export default function Profile(props: { user: User }) {
  return (
    <>
      <Head>
        <title>User Profile: {props.user.username}</title>
      </Head>
      <h1>id: {props.user.id}</h1>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { getUserById } = await import('../../util/database');

  const user = await getUserById(context.query.userId);
  console.log('user', user);
  return {
    props: {
      user: user,
    },
  };
}
