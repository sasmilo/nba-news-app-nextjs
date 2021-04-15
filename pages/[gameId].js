import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const axios = require('axios');
const paddBott = '20px';
const ourGray = '#1d2d35';
const lightGray = '#E9E4E4';

const boxscoreHeadingStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${paddBott};
  font-size: 0.8em;
  background-color: ${ourGray};
  color: ${lightGray};
`;

const teamsParentStyles = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const teamsStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: ${paddBott};
  font-size: 0.8em;

  span {
    font-weight: 700;
  }
`;

export default function BoxScore(props) {
  const [boxscore, setBoxscore] = useState(null);

  const gameDate = props.gameDate;
  // console.log(gameDate);

  const gameId = props.gameId;

  useEffect(() => {
    console.log(gameDate);

    const options = {
      method: 'GET',
      url: `https://data.nba.net/10s/prod/v1/${gameDate}/${gameId}_mini_boxscore.json`,
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

  // this is not error, bcs sometimes the answer from api comes late, and in meantime we show this conditional render
  // eslint-disable-next-line
  if (!boxscore) return <div>Searching for the stats...</div>;

  return (
    <>
      <Head>
        <title>Box score</title>
      </Head>
      <div css={boxscoreHeadingStyles}>
        Place:
        {'    '}
        {boxscore.arena.name},{'    '}
        {boxscore.arena.city}
        <br />
        Local time and date: {'    '}
        {boxscore.homeStartTime.slice(0, 2)}:
        {boxscore.homeStartTime.slice(2, 4)},{'    '}
        {boxscore.homeStartDate.slice(6, 8)}.
        {boxscore.homeStartDate.slice(4, 6)}.
        {boxscore.homeStartDate.slice(0, 4)}
        <br />
        Attendance: {boxscore.attendance}
      </div>
      <div css={teamsParentStyles}>
        <div css={teamsStyles}>
          <Image
            src={`/${boxscore.vTeam.triCode}.png`}
            alt="Image"
            width={100}
            height={100}
          />
          <br />
          <span>
            {boxscore.vTeam.triCode}
            {'    '}
            {boxscore.vTeam.score}
          </span>
        </div>
        <div css={teamsStyles}>
          <Image
            src={`/${boxscore.hTeam.triCode}.png`}
            alt="Image"
            width={100}
            height={100}
          />
          <br />
          <span>
            {boxscore.hTeam.triCode}
            {'    '}
            {boxscore.hTeam.score}
          </span>
        </div>
      </div>
    </>
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
