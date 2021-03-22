import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Layout from '../components/Layout';
import getNewsFromLastTwoDays from './api/news';
import getLastNightScores from './api/yesterdayscores';

const ourGray = '#1d2d35';
const lightGray = '#E9E4E4';

const newsStyles = css`
  color: ${ourGray};
  text-decoration: none;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 1px;
  line-height: 1;
  font-family: 'PT Sans', 'Helvetica', 'Arial', sans-serif;
  display: flex;

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
  }

  li + li {
    margin-left: 20px;
  }
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
    <Layout>
      <Head>
        <title>NBA News Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* <h1>Welcome to the NBA News home page!</h1> */}
        <div>
          <div css={scoresStyles}>
            <ul>
              <Carousel responsive={responsive} ssr={true} infinite={true}>
                {props.scoresArray.map((scores) => (
                  <li key={scores}>
                    <Link href="/">
                      <a>
                        {/* <Image
                          src={scores.urlToImage}
                          alt="Image"
                          width={100}
                          height={100}
                        /> */}
                        <br />
                        {'  '}
                        {'  '}
                        {scores.vTeam.triCode}
                        {'  '}
                        {'  '}-{'  '}
                        {'  '}
                        {scores.hTeam.triCode}
                        <br />
                        <br />
                        {'  '}
                        {'  '}
                        {'  '}
                        {scores.vTeam.score}
                        {'  '}
                        {'  '}-{'  '}
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
                <Link href={news.url}>
                  <a>
                    <Image
                      src={news.urlToImage}
                      alt="Image"
                      width={130}
                      height={100}
                    />
                    {/* <br /> */}
                    {'  '}
                    {'  '}
                    {news.title}
                    {/* <br /> */}
                    {'  '}
                    {'  '}
                    <p> {news.description}</p>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </Layout>
  );
}

export async function getServerSideProps() {
  const newsArray = await getNewsFromLastTwoDays();
  const scoresArray = await getLastNightScores();
  return {
    props: {
      newsArray: newsArray,
      scoresArray: scoresArray,
    },
  };
}
