import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import GetLastNightScores from '../components/yesterdayscores';
import { setDateCookieClientSide } from '../util/cookies';

const axios = require('axios');

const ourGray = '#1d2d35';
const lightGray = '#E9E4E4';

const scoresStyles = css`
  color: ${ourGray};
  text-decoration: none;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 2px;
  line-height: 1;
  font-family: 'PT Sans', 'Helvetica', 'Arial', sans-serif;
  display: flex;
  flex-flow: row wrap;

  ul {
    display: flex;
    justify-content: space-evenly;
    list-style-type: none;
    padding: 40px;
    background-color: ${lightGray};
    width: 100%;
  }

  a {
    text-decoration: none;
    color: ${ourGray};
    text-align: center;
  }

  li {
    padding: 2px;
    align-self: stretch;
    background-color: white;
    border: none;
    border-radius: 5px;
    min-width: 140px;
    align-content: center;
  }

  li + li {
    margin-left: 20px;
  }
`;

const paragraphStyles = css`
  text-align: center;
  background-color: ${ourGray};
  color: ${lightGray};
  padding: 20px;

  input {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

export default function Scores(props) {
  const [scores, setScores] = useState(props.yestScoresArray);

  const yesterday = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24)
    .toISOString()
    .slice(0, 10);

  const yesterdayWithoutDashes = yesterday.replace(/-/g, '');

  const [date, setDate] = useState(yesterdayWithoutDashes);

  setDateCookieClientSide(date);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 7,
      slidesToSlide: 7,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <>
      <Head>
        <title>NBA News Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <p css={paragraphStyles} data-cy="scores-page-content-p">
          Game scores on the day:
          {'  '}
          {'  '}
          <input
            type="date"
            onChange={(e) => {
              const newDate = e.target.value;
              const newDateWithoutDashes = newDate.replace(/-/g, '');
              setDate(newDateWithoutDashes);

              const options = {
                method: 'GET',
                url: `https://data.nba.net/10s/prod/v2/${newDateWithoutDashes}/scoreboard.json`,
                params: {},
                headers: {},
              };
              axios
                .request(options)
                .then(function (response) {
                  const scoresArray = response.data.games;

                  return setScores(scoresArray);
                })
                .catch(function (error) {
                  console.error(error);
                });
            }}
          />
        </p>

        <div css={scoresStyles}>
          <ul>
            <Carousel responsive={responsive} ssr={true} infinite={false}>
              {scores.map((game) => (
                // Here we use div instead of li tag
                // because Carousel adds another li tag
                // by itself. If we set this tag to li,
                // it would cause the conflict.
                <div key={game.gameId}>
                  <Link href={`/${game.gameId}`}>
                    <a>
                      <br />
                      <Image
                        src={`/${game.vTeam.triCode}.png`}
                        alt="Image"
                        width={25}
                        height={25}
                      />
                      {'  '}
                      {'  '}
                      {game.vTeam.triCode}
                      {'  '}
                      {'  '}
                      {'  '}
                      {game.vTeam.score}
                      <br />
                      <br />
                      <Image
                        src={`/${game.hTeam.triCode}.png`}
                        alt="Image"
                        width={25}
                        height={25}
                      />
                      {'  '}
                      {'  '}
                      {'  '}
                      {game.hTeam.triCode}
                      {'  '}
                      {'  '}
                      {'  '}
                      {game.hTeam.score}
                    </a>
                  </Link>
                </div>
              ))}
            </Carousel>
          </ul>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  const { getSessionByToken, getUserByToken } = await import(
    '../util/database'
  );

  const session = await getSessionByToken(context.req.cookies.session);
  const userByToken = await getUserByToken(session);

  if (
    !session ||
    session.userId !== userByToken.userId ||
    userByToken === 'undefined'
  ) {
    const yestScoresArray = await GetLastNightScores();
    return {
      props: {
        yestScoresArray: yestScoresArray || [],
      },
    };
  } else {
    const userId = userByToken.userId;

    const yestScoresArray = await GetLastNightScores();
    return {
      props: {
        yestScoresArray: yestScoresArray || [],
        userId: userId,
      },
    };
  }
}
