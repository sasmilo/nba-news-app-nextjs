exports.up = async (sql) => {
  await sql`
    CREATE TABLE IF NOT EXISTS users_teams (
      user_id INT REFERENCES users (user_id) ON UPDATE CASCADE,
			team_id INT REFERENCES teams (team_id) ON UPDATE CASCADE,
			CONSTRAINT users_teams_pkey PRIMARY KEY (user_id, team_id)  -- explicit pk

    )
  `;
};

exports.down = async (sql) => {
  await sql`
    DROP TABLE users_teams
  `;
};
