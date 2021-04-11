import camelcaseKeys from 'camelcase-keys';
import postgres from 'postgres';
import { generateToken } from './sessions';
import setPostgresDefaultsOnHeroku from './setPostgresDefaultsOnHeroku';

setPostgresDefaultsOnHeroku();

// Read in the values from the .env file
// (which should be ignored in Git!)
require('dotenv-safe').config();

function connectOneTimeToDatabase() {
  let sql;

  if (process.env.NODE_ENV === 'production') {
    // Heroku needs SSL connections but
    // has an "unauthorized" certificate
    // https://devcenter.heroku.com/changelog-items/852
    sql = postgres({ ssl: { rejectUnauthorized: false } });
  } else {
    if (!globalThis.__postgresSqlClient) {
      globalThis.__postgresSqlClient = postgres();
    }
    sql = globalThis.__postgresSqlClient;
  }
  return sql;
}

const sql = connectOneTimeToDatabase();

function camelcaseRecords(records) {
  return records.map((record) => camelcaseKeys(record));
}

export async function getTeams() {
  const teams = await sql`SELECT * FROM teams`;

  return camelcaseRecords(teams);
}

export async function getTeamById(id) {
  const teams = await sql`SELECT * FROM teams WHERE team_id =${id}`;

  return camelcaseRecords(teams)[0];
}

export async function getSessionByToken(sessionToken) {
  if (!sessionToken) {
    return undefined;
  }

  const sessions = await sql`
    SELECT
      *
    FROM
      sessions
    WHERE
      token = ${sessionToken} AND
      expiry > NOW()
  `;
  return camelcaseRecords(sessions)[0];
}

export async function getUserByToken(sessionToken) {
  if (!sessionToken) {
    return undefined;
  }

  const sessions = await sql`
    SELECT
      user_id
    FROM
      sessions
    WHERE
      token = ${sessionToken.token}
  `;
  // console.log(sessions);

  return camelcaseRecords(sessions)[0];
}

export async function getUserIdByToken(sessionToken) {
  if (!sessionToken) {
    return undefined;
  }

  const sessions = await sql`
    SELECT
      user_id
    FROM
      sessions
    WHERE
      token = ${sessionToken}
  `;
  // console.log(sessions);

  return camelcaseRecords(sessions)[0];
}

export async function isSessionTokenNotExpired(sessionToken) {
  const sessions = await sql`
    SELECT
      *
    FROM
      sessions
    WHERE
      token = ${sessionToken} AND
      expiry > NOW()
  `;
  return sessions.length > 0;
}

export async function createSessionWithFiveMinuteExpiry() {
  const token = generateToken();

  const sessions = await sql`
 INSERT INTO sessions
  (token, expiry)
  VALUES
  (${token}, NOW() + INTERVAL '5 minutes')
  RETURNING *
  `;
  return camelcaseRecords(sessions)[0];
}

export async function createSessionByUserId(userId) {
  const token = generateToken();

  const sessions = await sql`
    INSERT INTO sessions
      (token, user_id, expiry)
    VALUES
      (${token}, ${userId}, NOW() + INTERVAL '1 day')
    RETURNING *
  `;

  return camelcaseRecords(sessions)[0];
}

export async function deleteSessionById(id) {
  const sessions = await sql`
    DELETE FROM
      sessions
    WHERE
      session_id = ${id}
    RETURNING *
  `;
  return camelcaseRecords(sessions)[0];
}

export async function deleteSessionByToken(token) {
  const sessions = await sql`
    DELETE FROM
      sessions
    WHERE
      token = ${token}
    RETURNING *
  `;
  return camelcaseRecords(sessions)[0];
}

export async function deleteAllExpiredSessions() {
  const sessions = await sql`
    DELETE FROM
      sessions
    WHERE
      expiry < NOW()
    RETURNING *
  `;
  return camelcaseRecords(sessions)[0];
}

export async function getUserById(id) {
  const users = await sql`
    SELECT
      user_id,
      username
    FROM
      users
    WHERE
      user_id = ${id}
  `;
  return camelcaseRecords(users)[0];
}

export async function getUserByUsername(username) {
  const users = await sql`
    SELECT
      username
    FROM
      users
    WHERE
      username = ${username}
  `;
  return camelcaseRecords(users)[0];
}

export async function getUserWithHashedPasswordByUsername(username) {
  const users = await sql`
    SELECT
      *
    FROM
      users
    WHERE
      username = ${username}
  `;
  return camelcaseRecords(users)[0];
}

export async function createUser(username, passwordHash) {
  const users = await sql`
    INSERT INTO users
      (username, password_hash)
    VALUES
      (${username}, ${passwordHash})
    RETURNING user_id, username
  `;
  return camelcaseRecords(users)[0];
}

export async function createUserTeamPair(userId, teamId) {
  const userTeam = await sql`
    INSERT INTO users_teams
      (user_id, team_id)
    VALUES
      (${userId}, ${teamId})
    RETURNING user_id, team_id
  `;
  return camelcaseRecords(userTeam)[0];
}

export async function getUsersFavTeams(userId) {
  const userFavTeams = await sql`
    SELECT
      user_id,
      users_teams.team_id,
      team_name
    FROM
      users_teams

    INNER JOIN teams
    ON users_teams.team_id = teams.team_id

    WHERE
      user_id = ${userId}
  `;
  // console.log(userFavTeams);
  return camelcaseRecords(userFavTeams);
}

export async function deleteUser(userId) {
  const users = await sql`
    DELETE FROM
      users
    WHERE
    user_id = ${userId}
    RETURNING user_id
  `;
  return camelcaseRecords(users);
}

export async function deleteUserfromUsersTeams(userId) {
  const users = await sql`
    DELETE FROM
      users_teams
    WHERE
    user_id = ${userId}

  `;
  return camelcaseRecords(users);
}

export async function deleteUserTeamPair(userId, teamId) {
  const usersTeams = await sql`
    DELETE FROM
      users_teams
    WHERE
    user_id = ${userId} AND team_id = ${teamId}
    RETURNING *
  `;
  return camelcaseRecords(usersTeams);
}

export async function getFavTeamsNamesByUserId(userId) {
  const userFavTeams = await sql`
    SELECT
      team_name
    FROM
      teams
    WHERE
      user_id = ${userId}
  `;
  // console.log(userFavTeams);
  return camelcaseRecords(userFavTeams);
}
