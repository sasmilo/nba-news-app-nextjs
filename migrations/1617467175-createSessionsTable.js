exports.up = async (sql) => {
  await sql`
		CREATE TABLE IF NOT EXISTS sessions (
      session_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      token VARCHAR(50) UNIQUE,
      expiry TIMESTAMP NOT NULL DEFAULT NOW() + INTERVAL '24 hours',
			user_id INT REFERENCES users(user_id)
		)
	`;
};

exports.down = async (sql) => {
  await sql`
	DROP TABLE sessions
`;
};
