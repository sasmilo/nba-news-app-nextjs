import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';

const paddBott = '20px';

const boxscoreHeadingStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: ${paddBott};
  font-size: 0.8em;
`;

export default function team(props) {
  const teamTricode = props.teamTricode;
  const teamName = props.teamName;
  const primaryColor = props.primaryColor;
  const secondaryColor = props.secondaryColor;
  // const teamAndroidApp = props.teamAndroidApp;
  // const teamIosApp = props.teamIosApp;
  // const teamWebpage = props.homepage;
  // const teamTickets = props.tickets;

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
        <h1>{teamName}</h1>
        <br />
        <div>Primary color: {primaryColor}</div>
        <br />
        <div>Secondary color: {secondaryColor}</div>
        <br />
        {/* <div>Web page: {teamStats.web.homepage}</div>
        <br />
        <div>Buy tickets: {teamStats.web.tickets}</div>
        <br /> */}
        {/* <div>
          Get {teamName} Android app: {teamAndroidApp}
        </div> */}
        {/* <br />
        <div>
          Get {teamStats.ttsName} IOS app: {teamStats.app.ios}
        </div>  */}
        <br />
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { getTeamById } = await import('../../util/database');

  const { getTeamInfoFromApi } = await import('../teamdata');

  // console.log(context);
  const teamId = String(context.query.teamId);
  const teamMark = await getTeamById(teamId);

  const teamTricode = teamMark.nbaTricode;

  const teamObject = await getTeamInfoFromApi(teamTricode);
  // console.log(teamObject.web);

  const teamName = await teamObject.ttsName;
  const primaryColor = await teamObject.primaryColor;
  const secondaryColor = await teamObject.secondaryColor;
  // const teamAndroidApp = await teamObject.app.teamAndroidApp;
  // const teamIosApp = teamObject.app.teamIosApp;
  // const teamWebpage = teamObject.web.homepage;
  // const teamTickets = teamObject.web.tickets;

  // console.log(gameDate);
  return {
    props: {
      teamTricode: teamTricode,
      teamName: teamName,
      primaryColor: primaryColor,
      secondaryColor: secondaryColor,
      // teamAndroidApp: teamAndroidApp,
      // teamIosApp: teamIosApp,
      // teamWebpage: teamWebpage,
      // teamTickets: teamTickets,
    },
  };
}
