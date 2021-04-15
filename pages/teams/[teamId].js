import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import getTeamInfoFromApi from '../../components/teamdata';

const paddBott = '20px';
const ourGray = '#1d2d35';

const boxscoreHeadingStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: ${paddBott};
  font-size: 0.8em;
  a {
    text-decoration: none;
    color: ${ourGray};
  }
`;

export default function team(props) {
  const teamTricode = props.teamTricode;
  const teamName = props.teamName;
  const primaryColor = props.primaryColor;
  const secondaryColor = props.secondaryColor;
  const teamAndroidApp = props.teamAndroidApp;
  const teamIosApp = props.teamIosApp;
  const teamWebpage = props.teamWebpage;
  const teamTickets = props.teamTickets;

  if (!teamTricode) return <div>Searching for the data...</div>;

  return (
    <>
      <Head>
        <title>Team page {teamName}</title>
      </Head>
      <div css={boxscoreHeadingStyles}>
        <Image
          src={`/${teamTricode}.png`}
          alt="Image"
          width={150}
          height={150}
        />
        <br />
        <h1 data-cy="team-page-content-h1">{teamName}</h1>
        <br />
        <Link href={teamWebpage}>
          <a>
            <div> {teamWebpage}</div>
          </a>
        </Link>
        <br />
        <Link href={teamTickets}>
          <a>
            <div>Buy tickets: {teamTickets}</div>
          </a>
        </Link>
        <br />

        <Link href={teamAndroidApp}>
          <a>
            <div>Get {teamName} Android app</div>
          </a>
        </Link>

        <br />
        <Link href={teamIosApp}>
          <a>
            <div>Get {teamName} IOS app</div>
          </a>
        </Link>
        <br />
        <div>Primary color: {primaryColor}</div>
        <br />
        <div>Secondary color: {secondaryColor}</div>
        <br />

        <br />
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { getTeamById, getSessionByToken, getUserByToken } = await import(
    '../../util/database'
  );

  const session = await getSessionByToken(context.req.cookies.session);

  const userByToken = await getUserByToken(session);

  // console.log(context);
  const teamId = String(context.query.teamId);
  const teamMark = await getTeamById(teamId);

  const teamTricode = teamMark.nbaTricode;

  const teamObject = await getTeamInfoFromApi(teamTricode);
  // console.log(teamObject);
  // console.log(teamObject.web.homepage);

  const teamName = teamObject.ttsName;
  const primaryColor = teamObject.primaryColor;
  const secondaryColor = teamObject.secondaryColor;
  const teamAndroidApp = teamObject.app.android;
  const teamIosApp = teamObject.app.ios;
  const teamWebpage = teamObject.web.homepage;
  const teamTickets = teamObject.web.tickets;

  // console.log(gameDate);

  if (!session || session.userId !== userByToken.userId) {
    return {
      props: {
        userId: null,
        teamTricode: teamTricode,
        teamName: teamName,
        primaryColor: primaryColor,
        secondaryColor: secondaryColor,
        teamAndroidApp: teamAndroidApp,
        teamIosApp: teamIosApp,
        teamWebpage: teamWebpage,
        teamTickets: teamTickets,
      },
    };
  }

  const userId = userByToken.userId;

  return {
    props: {
      userId: userId,
      teamTricode: teamTricode,
      teamName: teamName,
      primaryColor: primaryColor,
      secondaryColor: secondaryColor,
      teamAndroidApp: teamAndroidApp,
      teamIosApp: teamIosApp,
      teamWebpage: teamWebpage,
      teamTickets: teamTickets,
    },
  };
}
