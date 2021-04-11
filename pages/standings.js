import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import getStandings from '../components/standings';

const ourGray = '#1d2d35';
const lightGray = '#E9E4E4';

const standingsStyles = css`
  display: grid;
  grid-template-columns: 1fr 1fr;

  h3 {
    background-color: ${lightGray};
    color: ${ourGray};
    text-align: center;
    padding: 20px;
  }

  p {
    background-color: ${ourGray};
    color: ${lightGray};
    text-align: center;
    padding: 5px;
    font-size: 0.8rem;
  }

  ul {
    list-style-type: none;
  }

  span {
    padding-left: 15px;
  }
`;

const headingStandingsStyles = css`
  background-color: ${lightGray};
  color: ${ourGray};
  h2 {
    background-color: ${ourGray};
    color: ${lightGray};
    text-align: center;
    padding: 20px;
  }
`;

export default function Standings(props) {
  // console.log(props.newsArray);
  getStandings();
  return (
    <>
      <Head>
        <title>NBA Standings</title>
      </Head>

      <main css={headingStandingsStyles}>
        <h2 data-cy="standings-page-content-h2">NBA Standings 2020/2021</h2>
        <div css={standingsStyles}>
          <div>
            <h3>Eastern Conference</h3>

            <ul>
              {props.standingsArray.league.standard.conference.east.map(
                (team) => (
                  <li key={team}>
                    <p>
                      <Image
                        src={`/${team.teamSitesOnly.teamTricode}.png`}
                        alt="Image"
                        width={30}
                        height={30}
                      />

                      <span>
                        {team.teamSitesOnly.teamKey}
                        {'  '}
                        {team.teamSitesOnly.teamNickname}
                      </span>

                      <span>
                        {team.win}-{team.loss}
                      </span>

                      {/* {team.gamesBehind} */}

                      <span>{(Number(team.winPct) * 100).toFixed(1)}%</span>
                      {/* {'  '}
                      {'  '}
                      {team.lastTenWin}/{team.lastTenLoss}
                      {'  '}
                      {'  '}
                      {team.streak} */}
                    </p>
                  </li>
                ),
              )}
            </ul>
          </div>
          <div>
            <h3>Western Conference</h3>
            <ul>
              {props.standingsArray.league.standard.conference.west.map(
                (team) => (
                  <li key={team}>
                    <p>
                      <Image
                        src={`/${team.teamSitesOnly.teamTricode}.png`}
                        alt="Image"
                        width={30}
                        height={30}
                      />
                      <span>
                        {team.teamSitesOnly.teamKey}
                        {'  '}
                        {team.teamSitesOnly.teamNickname}
                      </span>
                      <span>
                        {team.win}-{team.loss}
                      </span>
                      {/* {team.gamesBehind}
                      {'  '}
                      {'  '} */}
                      <span>{(Number(team.winPct) * 100).toFixed(1)}%</span>
                      {/* {'  '}
                      {'  '}
                      {team.lastTenWin}/{team.lastTenLoss}
                      {'  '}
                      {'  '}
                      {team.streak} */}
                    </p>
                  </li>
                ),
              )}
            </ul>
          </div>
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
    const standingsArray = await getStandings();
    return {
      props: {
        standingsArray: standingsArray,
      },
    };
  } else {
    const userId = userByToken.userId;

    const standingsArray = await getStandings();

    return {
      props: {
        standingsArray: standingsArray,
        userId: userId,
      },
    };
  }
}
