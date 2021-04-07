import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { getTeams } from '../../util/database';
import { Error, FavoriteTeams, Teams, User } from '../../util/types';

const ourGray = '#1d2d35';
const lightGray = '#E9E4E4';
const ourOrange = '#FFA500';

const profileStyles = css`
  background-color: ${ourGray};
  color: ${lightGray};
`;

const preferenceStyles = css`
  color: ${ourGray};
  background-color: ${lightGray};
  padding-top: 10px;
  padding-bottom: 10px;

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
`;

const imgStyles = css`
  margin-top: 15px;
`;

type Props =
  | {
      user: User;
      teams: Teams[];
      favoriteTeams: FavoriteTeams[];
    }
  | {
      user: null;
      teams: Teams[];
      favoriteTeams: FavoriteTeams[];
      errors: Error[];
    };

export default function Profile(props: Props) {
  if (!props.user) {
    return (
      <>
        <Head>
          <title>{props.errors[0].message}</title>
        </Head>
        <h1>{props.errors[0].message}</h1>
      </>
    );
  }

  const userIdNr = props.user.userId;
  const usersTeams = props.favoriteTeams;
  const allTeams = props.teams;

  // console.log(typeof allTeams);
  // console.log(allTeams);

  // console.log(usersTeams);

  return (
    <>
      <Head>
        <title>User Profile: {props.user.username}</title>
      </Head>
      <div css={profileStyles}>
        <h1>Username: {props.user.username}</h1>

        <div>User ID: {userIdNr}</div>
        <br />
        <div>Your current favorite teams:</div>
        <ul css={preferenceStyles}>
          {usersTeams.map((team) => (
            <li key={team.teamId}>
              <Image
                css={imgStyles}
                src={`/${allTeams[team.teamId - 1].nbaTricode}.png`}
                alt="Image"
                width={30}
                height={30}
              />{' '}
              {allTeams[team.teamId - 1].teamName}{' '}
              <button
                onClick={async () => {
                  const teamIdNr = team.teamId;
                  const response = await fetch('/api/delete-user-team ', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      userIdNr,
                      teamIdNr,
                    }),
                  });

                  const { userTeamPair } = await response.json();
                }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <br />
        <div>Pick your favorite teams to get news exclusively on them:</div>

        <br />
        <ul css={preferenceStyles}>
          {allTeams.map((team) => (
            <li key={team.teamId}>
              <div>
                <button
                  type="checkbox"
                  onClick={async () => {
                    const teamIdNr = team.teamId;
                    const response = await fetch('/api/preferences', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        userIdNr,
                        teamIdNr,
                      }),
                    });

                    const { userTeamPair } = await response.json();
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
                        userIdNr,
                        teamIdNr,
                      }),
                    });

                    const { userTeamPair } = await response.json();
                  }}
                >
                  Remove
                </button>
                <Image
                  src={`/${allTeams[team.teamId - 1].nbaTricode}.png`}
                  alt="Image"
                  width={30}
                  height={30}
                />{' '}
                {team.teamName}: {team.conference} Conference, {team.division}
                Division
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { getUserById, getSessionByToken, getUsersFavTeams } = await import(
    '../../util/database'
  );

  const session = await getSessionByToken(context.req.cookies.session);

  if (!session || session.userId !== Number(context.query.userId)) {
    return {
      props: {
        user: null,
        errors: [{ message: 'Access denied' }],
      },
    };
  }

  const user = await getUserById(context.query.userId);
  const teams = await getTeams();
  const favoriteTeams = await getUsersFavTeams(user.userId);
  // console.log(favoriteTeams);

  return {
    props: {
      user: user,
      teams: teams,
      favoriteTeams: favoriteTeams,
    },
  };
}
