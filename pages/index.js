import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';
import getNewsFromLastTwoDays from '../pages/api/news';

export default function Home(props) {
  // console.log(props.newsArray);
  return (
    <Layout>
      <Head>
        <title>NBA News Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Welcome to the NBA News home page!</h1>
        <ul>
          {props.newsArray.map((news) => (
            <li key={news}>
              <Link href={news.url}>
                <a>
                  <Image
                    src={news.urlToImage}
                    alt="Image"
                    width={100}
                    height={100}
                  />
                  <br />
                  {'  '}
                  {'  '}
                  {news.title}
                  <br />
                  {'  '}
                  {'  '}
                  {news.description}
                </a>
              </Link>
            </li>
          ))}
          ;
        </ul>
      </main>
    </Layout>
  );
}

export async function getServerSideProps() {
  const newsArray = await getNewsFromLastTwoDays();

  return {
    props: {
      newsArray: newsArray,
    },
  };
}
