import { css } from '@emotion/react';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';

const axios = require('axios');
const paddBott = '20px';

const singleProductStyle = css`
  display: block;
  align-items: center;
`;

const productNameStyle = css`
  font-family: 'Crimson Text Regular', 'PT Sans', 'Helvetica', 'Arial',
    sans-serif;
  text-align: center;
  padding-bottom: ${paddBott};
`;

const productImageStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: ${paddBott};
`;

const productPriceStyle = css`
  font-family: 'Source Sans Pro Regular', 'PT Sans', 'Helvetica', 'Arial',
    sans-serif;
  text-align: center;
  padding-bottom: ${paddBott};

  p {
    font-size: 1.2em;
  }

  p + p {
    font-size: 0.8em;
  }
`;

const productDescriptionStyle = css`
  font-family: 'Source Sans Pro Regular', 'PT Sans', 'Helvetica', 'Arial',
    sans-serif;
  text-align: center;
  padding-bottom: ${paddBott};
  font-size: 0.8em;
  max-width: 80%;
  margin: auto;
`;

const productDetailsStyle = css`
  font-family: 'Source Sans Pro Regular', 'PT Sans', 'Helvetica', 'Arial',
    sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: ${paddBott};
  font-size: 0.6em;

  p + p {
    padding-left: 10px;
  }
`;

const boxscoreHeadingStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: ${paddBott};
  font-size: 0.8em;
`;

const teamsParentStyles = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const teamsStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: ${paddBott};
  font-size: 0.8em;
`;

export default function BoxScore(props) {
  const [boxscore, setBoxscore] = useState(null);

  const gameDate = props.gameDate;
  // console.log(gameDate);

  const gameId = props.gameId;

  useEffect(() => {
    // console.log(gameDate);

    const options = {
      method: 'GET',
      url: `http://data.nba.net/10s/prod/v1/${gameDate}/${gameId}_mini_boxscore.json`,
      params: {},
      headers: {},
    };
    axios
      .request(options)
      .then(function (response) {
        // console.log(response.data);
        const boxscoreObject = response.data.basicGameData;
        // console.log(boxscoreObject);
        return setBoxscore(boxscoreObject);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [gameDate, gameId]);

  if (!boxscore) return <div>Getting ready...</div>;

  return (
    <Layout>
      <Head>
        <title>Box score</title>
      </Head>
      <div css={boxscoreHeadingStyles}>
        Place:
        {'    '}
        {boxscore.arena.name},{'    '}
        {boxscore.arena.city}
        <br />
        Local time and date: {boxscore.homeStartTime},{'    '}
        {boxscore.homeStartDate}
        <br />
        Attendance: {boxscore.attendance}
      </div>
      <div css={teamsParentStyles}>
        <div css={teamsStyles}>
          {boxscore.vTeam.triCode}
          {'    '}
          {boxscore.vTeam.score}
        </div>
        <div css={teamsStyles}>
          {boxscore.hTeam.triCode}
          {'    '}
          {boxscore.hTeam.score}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  // console.log(context);
  const gameId = String(context.query.gameId);
  const gameDate = String(context.req.cookies.gamedate);
  // console.log(gameDate);
  return {
    props: {
      gameId: gameId,
      gameDate: gameDate,
    },
  };
}
