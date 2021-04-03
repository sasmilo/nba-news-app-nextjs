exports.up = async (sql) => {
  await sql`CREATE TABLE IF NOT EXISTS teams (
		team_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
		team_name VARCHAR(50),
		nba_id INT,
		nba_url_code VARCHAR(50),
		conference VARCHAR(50),
		division VARCHAR(50),
		city VARCHAR(50)
	)
	`;
};

exports.down = async (sql) => {
  await sql`
	DROP TABLE IF EXISTS teams`;
};
