import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import getNewsFromLastTwoDays from './api/news';
import GetLastNightScores from './api/yesterdayscores';

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

const newsFieldStyles = css`
  display: grid;
  grid-template-columns: 1fr 8fr;
`;

export default function SearchPage(props) {
  const allNews = props.newsArray;
  const searchString = props.searchString;

  const filteredNews = allNews.filter(function (currentElement) {
    // the current value is an object, so you can check on its properties
    return Object.values(currentElement).some((value) => {
      // Object.values is an array of current object's values, inside of
      // which we are searching for the ones that include our search term
      if (typeof value === 'string') {
        // since in those values there are objects and strings, we are interested only in strings
        return value.includes(searchString);
        // we want that filter passes only those objects whose values include our search term
      } else {
        return false;
      }
    });
  });
  if (filteredNews === []) {
    return (
      <div>
        At this moment, there are no articles here that match your search
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>NBA News Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* <h1>Welcome to the NBA News home page!</h1> */}
        <div css={newsStyles}>
          <ul>
            {filteredNews.map((news) => (
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
                      <div>
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
  const newsArray = await getNewsFromLastTwoDays();
  const scoresArray = await GetLastNightScores();
  const searchString = String(context.req.cookies.search);
  return {
    props: {
      newsArray: newsArray || [],
      scoresArray: scoresArray || [],
      searchString: searchString,
    },
  };
}
