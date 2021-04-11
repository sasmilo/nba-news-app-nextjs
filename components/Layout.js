import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';
import { setSearchCookieClientSide } from '../util/cookies';

const ourGray = '#1d2d35';
const lightGray = '#E9E4E4';
const ourOrange = '#FFA500';

const headerStyles = css`
  background: ${lightGray};
  color: ${ourGray};
  padding: 8px;

  div {
    display: flex;
    flex-direction: row;
  }

  a + a {
    margin-left: 25px;
  }
`;

const headerDiv1 = css`
  padding-right: auto;
  margin-right: auto;
`;

const headerDiv2 = css`
  margin-top: 10px;
  padding-top: 8px;
  padding-right: 28px;
  align-items: right;

  a {
    color: ${ourGray};
    text-decoration: none;
    display: block;
    padding: 12px 19px 0;
    margin-top: 10 px;
    outline-offset: -1px;
    transition: all 0.2s ease-in-out;
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 2px;
    line-height: 1;
    text-transform: uppercase;
    background-color: transparent;
    border-bottom: 2px solid transparent;
    font-family: 'PT Sans', 'Helvetica', 'Arial', sans-serif;

    :hover {
      border-bottom: 2px solid ${ourOrange};
    }
  }
`;

const searchStyles = css`
  border: none;
  border-radius: 10px;
  font-family: 'PT Sans', 'Helvetica', 'Arial', sans-serif;
  font-size: 0.6rem;
  padding: 0 15px;
  margin: 10px 30px;
`;

const navStyles = css`
  display: flex;
  justify-content: space-around;
`;

const footerStyles = css`
  border-top: 0.7px solid rgba(255, 255, 255, 0.5);
  padding: 0.6rem 0 0.7rem 0;
  background: ${ourGray};
  text-align: center;
  color: white;
  font-family: 'PT Sans', 'Helvetica', 'Arial', sans-serif;

  p {
    opacity: 0.5;
    font-size: 0.75rem;
  }
  a {
    text-decoration: none;
    color: ${lightGray};
  }
`;

const bodyStyles = css`
  background: white;
  margin: 0;
  padding: 30px 0 0 0;
  min-height: 78.3vh;

  h1 {
    font-family: 'Crimson Text Regular', 'PT Sans', 'Helvetica', 'Arial',
      sans-serif;
  }

  p {
    font-family: 'Source Sans Pro Regular', 'PT Sans', 'Helvetica', 'Arial',
      sans-serif;
  }
`;

const loginStyles = css`
  padding-top: 25px;

  a {
    font-family: 'Source Sans Pro Regular', 'PT Sans', 'Helvetica', 'Arial',
      sans-serif;
    font-size: 0.7rem;
    text-decoration: none;
    color: ${ourGray};

    :hover {
      transform: scale(1.05);
      transition: all 0.2s ease-in-out;
      font-weight: bold;
    }
  }
`;

export default function Layout(props) {
  const userId = props.children.props.userId;
  // console.log(props);
  // console.log(userId);

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header css={headerStyles}>
        <nav css={navStyles}>
          <div css={headerDiv1}>
            <Link href="/">
              <a>
                <Image
                  src="/nba-news-logo.png"
                  alt="NBA News logo"
                  width={102}
                  height={60}
                />
              </a>
            </Link>
          </div>
          <div css={headerDiv2}>
            <Link href="/scores">
              <a data-cy="header-scores">Scores</a>
            </Link>
            <Link href="/standings">
              <a data-cy="header-standings">Standings</a>
            </Link>
            <Link href="/teams">
              <a data-cy="header-teams">Teams</a>
            </Link>
          </div>
          <div>
            <input
              css={searchStyles}
              type="search"
              placeholder="Search the news"
              onKeyDown={(event) => {
                const newSearch = event.target.value;
                if (event.key === 'Enter') {
                  setSearchCookieClientSide(newSearch);
                  Router.push(`/search/?${newSearch}`);
                }
              }}
            />
          </div>

          <div>
            <div css={loginStyles}>
              {!props.isSessionValid ? (
                <>
                  <Link href="/register">
                    <a data-cy="header-register">Register</a>
                  </Link>
                  <Link href="/login">
                    <a data-cy="header-login">Login</a>
                  </Link>
                </>
              ) : (
                <div>
                  <Link href={`/profile/${userId}`}>
                    <a>
                      <Image
                        src="/account3.svg"
                        alt="account icon"
                        width={40}
                        height={40}
                      />
                    </a>
                  </Link>
                  <Link href="/logout">
                    <a data-cy="header-logout">Logout</a>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>

      <div css={bodyStyles}>{props.children}</div>
      <footer css={footerStyles}>
        <p>
          © 2021 · <a href="/">NBA News</a> · All rights reserved ·
        </p>
      </footer>
    </>
  );
}
