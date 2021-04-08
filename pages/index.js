import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import getLastNightScores from '../components/yesterdayscores';
import getGeneralNewsFromLastTwoDays from './news';
import getPersonalizedNewsFromLastTwoDays from './personalizednews';

const ourGray = '#1d2d35';
const lightGray = '#E9E4E4';

const newsStyles = css`
  color: ${ourGray};
  text-decoration: none;

  ul {
    list-style-type: none;
    padding: 40px;
  }

  a {
    text-decoration: none;
    color: ${ourGray};
    text-align: center;
  }

  li {
    background-color: ${lightGray};
    border: none;
    border-radius: 5px;
    padding: 10px;
    align-self: stretch;
    margin-bottom: 10px;
  }

  h4 {
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 1px;
    line-height: 1;
    font-family: 'PT Sans', 'Helvetica', 'Arial', sans-serif;
    /* display: flex; */
    text-align: left;
    padding-bottom: 15px;
    margin: 0;
  }

  p {
    font-size: 0.7rem;
    font-weight: 300;
    letter-spacing: 1px;
    line-height: 1;
    padding-top: 5px;
    text-align: left;
  }

  img {
    border-radius: 5px;
  }
`;

const scoresStyles = css`
  color: ${lightGray};
  text-decoration: none;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 2px;
  line-height: 1;
  font-family: 'PT Sans', 'Helvetica', 'Arial', sans-serif;
  display: flex;
  flex-flow: row wrap;
  width: 100%;

  ul {
    display: flex;
    justify-content: space-evenly;
    list-style-type: none;
    padding: 20px 40px;
    background-color: ${ourGray};
    width: 95%;
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
  }

  li + li {
    margin-left: 20px;
  }

  div + div {
    padding-left: 10 px;
  }
`;

const newsFieldStyles = css`
  display: grid;
  grid-template-columns: 1fr 8fr;
`;

const newsTextStyles = css`
  padding-left: 20 px;
`;

export default function Home(props) {
  // console.log(props.newsArray);
  getLastNightScores();
  // console.log(props.scoresArray[0].vTeam.triCode);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
      slidesToSlide: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 4,
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
        {/* <h1>Welcome to the NBA News home page!</h1> */}
        <div>
          <div css={scoresStyles}>
            <ul>
              <Carousel responsive={responsive} ssr={true} infinite={false}>
                {props.scoresArray.map((scores) => (
                  <li key={scores}>
                    <Link href={`/${scores.gameId}`}>
                      <a>
                        {/* <Image
                          src={scores.urlToImage}
                          alt="Image"
                          width={100}
                          height={100}
                        /> */}
                        <br />
                        <Image
                          src={`/${scores.vTeam.triCode}.png`}
                          alt="Image"
                          width={25}
                          height={25}
                        />
                        {'  '}
                        {'  '}
                        {scores.vTeam.triCode}
                        {'  '}
                        {'  '}
                        {'  '}
                        {scores.vTeam.score}
                        <br />
                        <br />
                        <Image
                          src={`/${scores.hTeam.triCode}.png`}
                          alt="Image"
                          width={25}
                          height={25}
                        />
                        {'  '}
                        {'  '}
                        {'  '}
                        {scores.hTeam.triCode}
                        {'  '}
                        {'  '}
                        {'  '}
                        {scores.hTeam.score}
                      </a>
                    </Link>
                  </li>
                ))}
              </Carousel>
            </ul>
          </div>
        </div>

        <div css={newsStyles}>
          <ul>
            {props.newsArray.map((news) => (
              <li key={news}>
                <Link href={news.link}>
                  <a>
                    <div css={newsFieldStyles}>
                      <div>
                        <Image
                          src={news.media}
                          alt="Image"
                          width={130}
                          height={100}
                        />
                      </div>
                      <div css={newsTextStyles}>
                        <h4>{news.title}</h4>
                        {/* <br /> */}
                        {'  '}
                        {'  '}
                        <p> {news.summary}</p>
                      </div>
                    </div>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  const { getSessionByToken, getUsersFavTeams, getUserByToken } = await import(
    '../util/database'
  );

  const scoresArray = await getLastNightScores();

  const session = await getSessionByToken(context.req.cookies.session);

  const user = await getUserByToken(session);

  if (!session || session.userId !== user.userId || user === 'undefined') {
    const newsArray = await getGeneralNewsFromLastTwoDays();
    return {
      props: {
        newsArray: newsArray || [],
        scoresArray: scoresArray || [],
      },
    };
  } else {
    // const user = await getUserById(context.query.userId);
    const favoriteTeamsArray = await getUsersFavTeams(user.userId);
    // console.log(favoriteTeamsArray);

    const favTeams = favoriteTeamsArray.map((team) => team.teamName);
    const favTeamsInOneString = favTeams.join();
    const queryString = favTeamsInOneString.replace(',', ' ');
    // console.log(queryString);

    const newsArray = await getPersonalizedNewsFromLastTwoDays(queryString);

    return {
      props: {
        newsArray: newsArray || [],
        scoresArray: scoresArray || [],
      },
    };
  }
}
