import { css, Global } from '@emotion/react';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';

export const globalStyles = (
  <Global
    styles={css`
      html,
      body {
        margin: 0;
        padding: 0;
        background: white;
        min-height: 70vh;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
          Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: 24px;
      }

      h1 {
        margin-block-start: 0em;
        margin-block-end: 0em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
      }

      p {
        margin-block-start: 0em;
        margin-block-end: 0em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
      }

      ul {
        margin-block-start: 0em;
        margin-block-end: 0em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        padding-inline-start: 0px;
      }
    `}
  />
);

function MyApp({ Component, pageProps }) {
  const [isSessionStateStale, setIsSessionStateStale] = useState(true);
  const [isSessionValid, setIsSessionValid] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/is-session-valid');
      const newValue = (await response.json()).isSessionValid;
      setIsSessionValid(newValue);
      setIsSessionStateStale(false);
    }

    if (isSessionStateStale) fetchData();
  }, [isSessionStateStale]);

  return (
    <>
      {globalStyles}
      <Layout isSessionValid={isSessionValid}>
        <Component
          {...pageProps}
          setIsSessionStateStale={setIsSessionStateStale}
        />
      </Layout>
    </>
  );
}

export default MyApp;
