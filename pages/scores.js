import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Layout from '../components/Layout';
import { setDateCookieClientSide } from '../util/cookies';
import GetLastNightScores from './api/yesterdayscores';

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
`;

export default function Scores(props) {
  const [scores, setScores] = useState(props.yestScoresArray);

  // console.log(scores);

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
    <Layout>
      <Head>
        <title>NBA News Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <p css={paragraphStyles}>
          Game scores on the day:
          {'  '}
          {'  '}
          <input
            type="date"
            onChange={(e) => {
              const newDate = e.target.value;
              const newDateWithoutDashes = newDate.replaceAll('-', '');
              setDateCookieClientSide(newDateWithoutDashes);
              // localStorage.setItem('gamedate', `${newDateWithoutDashes}`);

              const options = {
                method: 'GET',
                url: `http://data.nba.net/10s/prod/v2/${newDateWithoutDashes}/scoreboard.json`,
                params: {},
                headers: {},
              };
              axios
                .request(options)
                .then(function (response) {
                  const scoresArray = response.data.games;
                  // console.log(scoresArray);
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
            <Carousel responsive={responsive} ssr={true} infinite={true}>
              {scores.map((game) => (
                <li key={game.gameId}>
                  <Link href={`/${game.gameId}`}>
                    <a>
                      {/* <Image
                    src={game.urlToImage}
                    alt="Image"
                    width={100}
                    height={100}
                  /> */}
                      <br />
                      {'  '}
                      {'  '}
                      {game.gameId}
                      <br />
                      {'  '}
                      {'  '}
                      {game.vTeam.triCode}
                      {'  '}
                      {'  '}-{'  '}
                      {'  '}
                      {game.hTeam.triCode}
                      <br />
                      <br />
                      {'  '}
                      {'  '}
                      {'  '}
                      {game.vTeam.score}
                      {'  '}
                      {'  '}-{'  '}
                      {'  '}
                      {game.hTeam.score}
                    </a>
                  </Link>
                </li>
              ))}
            </Carousel>
          </ul>
        </div>
      </main>
    </Layout>
  );
}

export async function getServerSideProps() {
  const yestScoresArray = await GetLastNightScores();
  return {
    props: {
      yestScoresArray: yestScoresArray || [],
    },
  };
}
