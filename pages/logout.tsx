import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { Dispatch, SetStateAction, useEffect } from 'react';

const ourGray = '#1d2d35';
const lightGray = '#E9E4E4';

const logoutStyles = css`
  text-align: center;
  background-color: ${ourGray};
  color: ${lightGray};
  padding: 20px;
`;

type Props = {
  setIsSessionStateStale: Dispatch<SetStateAction<boolean>>;
};
export default function Logout(props: Props) {
  useEffect(() => {
    props.setIsSessionStateStale(true);
  }, [props]);

  setTimeout(function () {
    window.location.href = '/';
  }, 1000);
  return (
    <>
      <Head>
        <title>Logged out successfully</title>
      </Head>

      <h3 css={logoutStyles} data-cy="logout-content-h1">
        Logged out successfully
      </h3>
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
