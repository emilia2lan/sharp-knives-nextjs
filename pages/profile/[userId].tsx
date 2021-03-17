import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';

import {
  Error,
  User,
} from '../../util/types';

type Props =
  | {
      user: User;
    }
  | {
      user: null;
      errors: Error[];
    };

export default function Profile(props: Props) {
  if (!props.user) {
    return (
      <>
        <Head>
          <title>{props.errors[0].message}</title>
        </Head>
        <h1>{props.errors[0].message}</h1>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>User Profile: {props.user.username}</title>
      </Head>
      <h1>User: {props.user.username}</h1>
      <h3>id: {props.user.id}</h3>
    </>
  );
}

// here you get the to the specific page of each user and is shown the username and the id
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { getUserById, getSessionByToken } = await import(
    '../../util/database'
  );

  const session = await getSessionByToken(context.req.cookies.session);

  if (!session || session.userId !== Number(context.query.userId)) {
    return {
      props: {
        user: null,
        errors: [{ message: 'Access denied' }],
      },
    };
  }

  const user = await getUserById(context.query.userId);
  return { props: { user: user } };
}
