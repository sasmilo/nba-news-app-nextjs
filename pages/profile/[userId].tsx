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

    }
  | {
      user: null;
      teams: Teams[];
      favoriteTeams: FavoriteTeams[];
      errors: Error[];
    };

export default function Profile(props: Props) {
  // const router = useRouter();
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

  const allTeams = props.teams;
  const userIdNr = props.user.userId;
  const usersTeams = props.favoriteTeams;

  return (
    <>
      <Head>
        <title>User Profile: {props.user.username}</title>
      </Head>
      <div css={profileStyles}>
        {/* <button
          onClick={async () => {
            const response = await fetch('/api/delete-user ', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                userIdNr,
              }),
            });

            const { deletedUser } = await response.json();
            console.log(deletedUser);
            router.push('/userdeleted');
          }}
        >
          Delete your profile
        </button> */}
        <h1 data-cy="profile-page-content-h1">
          Username: {props.user.username}
        </h1>

        <div>User ID: {userIdNr}</div>
        <br />
        <div>Your current favorite teams:</div>
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

                  // const restOfFavTeams = usersTeams.filter(
                  //   (obj) => obj.teamId !== userTeamPair.teamId,
                  // );
                  // eslint-disable-next-line
                  location.reload(false);
                  // setUsersTeams(userTeamPair);
                  // console.log(userTeamPair);
                }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <br />
        <div>Pick your favorite teams and get news exclusively on them:</div>

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
                    {team.division}
                    Division
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
  const { getUserById, getUsersFavTeams, getSessionByToken } = await import(
    '../../util/database'
  );



  const session = await getSessionByToken(context.req.cookies.session);

  if (!session || session.userId !== Number(context.query.userId)) {
    return {
      props: {
        user: null,
        errors: [{ message: 'You need to login first' }],
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
