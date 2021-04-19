import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { getTeams } from '../../util/database';
import { Error, FavoriteTeams, Teams, User } from '../../util/types';

const ourGray = '#1d2d35';
const lightGray = '#E9E4E4';
const ourOrange = '#FFA500';

const profileStyles = css`
  background-color: ${ourGray};
  color: ${lightGray};

  h3,
  p {
    padding-left: 20px;
    text-align: center;
  }
`;

const preferenceStyles = css`
  color: ${ourGray};
  background-color: ${lightGray};
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  list-style-type: none;
  text-align: center;

  li {
    align-self: stretch;
    margin-bottom: 10px;
    font-size: 0.7rem;
    font-weight: 500;
    letter-spacing: 1px;
    line-height: 1;
  }

  button {
    background-color: ${ourOrange};
    color: ${ourGray};
    border: none;
    border-radius: 5px;
    cursor: pointer;
    padding: 5px;
  }

  button + button {
    background-color: ${ourGray};
    color: ${lightGray};
    margin-left: 5px;
    margin-right: 5px;
  }

  a {
    text-decoration: none;
    color: ${ourGray};
  }
`;

const imgStyles = css`
  margin-top: 15px;
`;

type Props =
  | {
      user: User;
      teams: Teams[];
      favoriteTeams: FavoriteTeams[];
      csrfToken: String;
    }
  | {
      user: null;
      teams: Teams[];
      favoriteTeams: FavoriteTeams[];
      errors: Error[];
    };

export default function TeamsPage(props: Props) {
  const allTeams = props.teams;

  if (!props.user) {
    return (
      <>
        <Head>
          <title>Teams</title>
        </Head>
        <div css={profileStyles}>
          <h3>{props.errors[0].message}</h3>
        </div>

        <ul css={preferenceStyles}>
          {allTeams.map((team) => (
            <li key={team.teamId}>
              <div>
                <Link href={`/teams/${team.teamId}`}>
                  <a>
                    <Image
                      src={`/${allTeams[team.teamId - 1].nbaTricode}.png`}
                      alt="Image"
                      width={30}
                      height={30}
                      data-cy="teams-page-content-team-image"
                    />{' '}
                    {team.teamName}: {team.conference} Conference,{' '}
                    {team.division}
                    Division
                  </a>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </>
    );
  }

  const usersTeams = props.favoriteTeams;

  return (
    <>
      <Head>
        <title>Teams</title>
      </Head>
      <div css={profileStyles}>
        <br />
        <h3>Your current favorite teams:</h3>
        <br />
        <ul css={preferenceStyles}>
          {usersTeams.map((team) => (
            <li key={team.teamId}>
              <Link href={`/teams/${team.teamId}`}>
                <a>
                  <Image
                    css={imgStyles}
                    src={`/${allTeams[team.teamId - 1].nbaTricode}.png`}
                    alt="Image"
                    width={30}
                    height={30}
                  />{' '}
                  {allTeams[team.teamId - 1].teamName}{' '}
                </a>
              </Link>
              <button
                onClick={async () => {
                  const teamIdNr = team.teamId;
                  const response = await fetch('/api/delete-user-team ', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      teamIdNr,
                    }),
                  });

                  const { userTeamPair } = await response.json();
                  console.log(userTeamPair);
                  // eslint-disable-next-line
                  location.reload(false);
                }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <br />
        <p>Pick your favorite teams and get news exclusively on them:</p>

        <br />
        <ul css={preferenceStyles}>
          {allTeams.map((team) => (
            <li key={team.teamId}>
              <div>
                <button
                  onClick={async () => {
                    const teamIdNr = team.teamId;
                    const response = await fetch('/api/create-user-team', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        teamIdNr,
                      }),
                    });

                    const { userTeamPair } = await response.json();
                    console.log(userTeamPair);
                    // eslint-disable-next-line
                    location.reload(false);
                  }}
                >
                  Add
                </button>
                <button
                  onClick={async () => {
                    const teamIdNr = team.teamId;
                    const response = await fetch('/api/delete-user-team ', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        teamIdNr,
                      }),
                    });

                    const { userTeamPair } = await response.json();
                    console.log(userTeamPair);
                    // eslint-disable-next-line
                    location.reload(false);
                  }}
                >
                  Remove
                </button>
                <Link href={`/teams/${team.teamId}`}>
                  <a>
                    <Image
                      src={`/${allTeams[team.teamId - 1].nbaTricode}.png`}
                      alt="Image"
                      width={30}
                      height={30}
                    />{' '}
                    {team.teamName}: {team.conference} Conference,{' '}
                    {team.division} Division
                  </a>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { getSessionByToken, getUsersFavTeams, getUserByToken } = await import(
    '../../util/database'
  );

  const session = await getSessionByToken(context.req.cookies.session);

  const teams = await getTeams();
  const userByToken = await getUserByToken(session);

  if (!session || session.userId !== userByToken.userId) {
    return {
      props: {
        user: null,
        teams: teams,
        errors: [{ message: 'You need to login to see your favorite teams' }],
      },
    };
  }

  const user = userByToken;

  const userId = user.userId;

  const favoriteTeams = await getUsersFavTeams(user.userId);

  return {
    props: {
      user: user,
      userId: userId,
      teams: teams,
      favoriteTeams: favoriteTeams,
    },
  };
}
