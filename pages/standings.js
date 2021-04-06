import { css } from '@emotion/react';
import Head from 'next/head';
import getStandings from './api/standings';

const standingsStyles = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const headingStandingsStyles = css`
  h2 {
    text-align: center;
    padding-bottom: 10px;
  }
`;

export default function Standings(props) {
  // console.log(props.newsArray);
  getStandings();
  return (
    <>
      <Head>
        <title>NBA Standings</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main css={headingStandingsStyles}>
        <h2>NBA Standings 2020/2021</h2>
        <div css={standingsStyles}>
          <div>
            <p>Eastern Conference</p>
            <ol>
              {props.standingsArray.league.standard.conference.east.map(
                (team) => (
                  <li key={team}>
                    <p>
                      {/* <Image
                    src={news.urlToImage}
                    alt="Image"
                    width={100}
                    height={100}
                  /> */}
                      {/* <br /> */}
                      {'  '}
                      {'  '}
                      {team.teamSitesOnly.teamKey}
                      {'  '}
                      {'  '}
                      {team.teamSitesOnly.teamNickname}
                      {'  '}
                      {'  '}
                      {team.win}
                      {'  '}
                      {'  '}
                      {team.loss}
                      {'  '}
                      {'  '}
                      {team.gamesBehind}
                      {'  '}
                      {'  '}
                      {team.winPct}
                      {'  '}
                      {'  '}
                      {team.lastTenWin}/{team.lastTenLoss}
                      {'  '}
                      {'  '}
                      {team.streak}
                    </p>
                  </li>
                ),
              )}
            </ol>
          </div>
          <div>
            <p>Western Conference</p>
            <ol>
              {props.standingsArray.league.standard.conference.west.map(
                (team) => (
                  <li key={team}>
                    <p>
                      {/* <Image
                    src={news.urlToImage}
                    alt="Image"
                    width={100}
                    height={100}
                  /> */}
                      {/* <br /> */}
                      {'  '}
                      {'  '}
                      {team.teamSitesOnly.teamKey}
                      {'  '}
                      {'  '}
                      {team.teamSitesOnly.teamNickname}
                      {'  '}
                      {'  '}
                      {team.win}
                      {'  '}
                      {'  '}
                      {team.loss}
                      {'  '}
                      {'  '}
                      {team.gamesBehind}
                      {'  '}
                      {'  '}
                      {team.winPct}
                      {'  '}
                      {'  '}
                      {team.lastTenWin}/{team.lastTenLoss}
                      {'  '}
                      {'  '}
                      {team.streak}
                    </p>
                  </li>
                ),
              )}
            </ol>
          </div>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const standingsArray = await getStandings();

  return {
    props: {
      standingsArray: standingsArray,
    },
  };
}
