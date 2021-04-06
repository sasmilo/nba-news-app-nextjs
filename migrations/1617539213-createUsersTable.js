exports.up = async (sql) => {
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      user_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      username VARCHAR(50) UNIQUE,
      password_hash VARCHAR(100)
    )
  `;
};

exports.down = async (sql) => {
  await sql`
    DROP TABLE users
  `;
};
