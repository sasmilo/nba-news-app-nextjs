exports.up = async (sql) => {
  await sql`
	INSERT INTO teams (
		team_name,
		nba_id,
		nba_url_code,
		conference,
		division,
		city
	)
	VALUES
	('Atlanta Hawks', 1610612737, 'hawks', 'Eastern', 'Southeast', 'Atlanta'),
	('Philadelphia 76ers', 1610612755, 'sixers', 'Eastern', 'Atlantic', 'Philadelphia'),
	('Brooklyn Nets', 1610612751, 'nets', 'Eastern', 'Atlantic', 'New York'),
	('Milwaukee Bucks', 1610612749, 'bucks', 'Eastern', 'Central', 'Milwaukee'),
	('Miami Heat', 1610612748, 'heat', 'Eastern', 'Southeast', 'Miami'),
	('Charlotte Hornets', 1610612766, 'hornets', 'Eastern', 'Southeast', 'Charlotte'),
	('New York Knicks', 1610612752, 'knicks', 'Eastern', 'Atlantic', 'New York'),
	('Boston Celtics', 1610612738, 'celtics', 'Eastern', 'Atlantic', 'Boston'),
	('Chicago Bulls', 1610612741, 'bulls', 'Eastern', 'Central', 'Chicago'),
	('Indiana Pacers', 1610612754, 'pacers', 'Eastern', 'Central', 'Indianapolis'),
	('Toronto Raptors', 1610612761, 'raptors', 'Eastern', 'Atlantic', 'Toronto'),
	('Cleveland Cavaliers', 1610612739, 'cavaliers', 'Eastern', 'Central', 'Cleveland'),
	('Washington Wizards', 1610612764, 'wizards', 'Eastern', 'Southeast', 'Washington'),
	('Orlando Magic', 1610612753, 'magic', 'Eastern', 'Southeast', 'Orlando'),
	('Detroit Pistons', 1610612765, 'pistons', 'Eastern', 'Central', 'Detroit'),
	('Utah Jazz', 1610612762, 'jazz', 'Western', 'Northwest', 'Salt Lake City'),
	('Los Angeles Lakers', 1610612747, 'lakers', 'Western', 'Pacific', 'Los Angeles'),
	('Phoenix Suns', 1610612756, 'suns', 'Western', 'Pacific', 'Phoenix'),
	('Los Angeles Clippers', 1610612746, 'clippers', 'Western', 'Pacific', 'Los Angeles'),
	('Denver Nuggets', 1610612743, 'nuggets', 'Western', 'Northwest', 'Denver'),
	('Portland Trailblazers', 1610612757, 'blazers', 'Western', 'Northwest', 'Portland'),
	('San Antonio Spurs', 1610612759, 'spurs', 'Western', 'Southwest', 'San Antonio'),
	('Dallas Mavericks', 1610612742, 'mavericks', 'Western', 'Southwest', 'Dallas'),
	('Golden State Warriors', 1610612744, 'warriors', 'Western', 'Pacific', 'San Francisco'),
	('Memphis Grizzlies', 1610612763, 'grizzlies', 'Western', 'Southwest', 'Memphis'),
	('Oklahoma City Thunder', 1610612760, 'thunder', 'Western', 'Northwest', 'Oklahoma City'),
	('New Orleans Pelicans', 1610612740, 'pelicans', 'Western', 'Southwest', 'New Orleans'),
	('Sacramento Kings', 1610612758, 'kings', 'Western', 'Pacific', 'Sacramento'),
	('Houston Rockets', 1610612745, 'rockets', 'Western', 'Southwest', 'Houston'),
	('Minnesota Timberwolves', 1610612750, 'timberwolves', 'Western', 'Northwest', 'Minneapolis')



	`;
};

exports.down = async (sql) => {
  await sql`
	DELETE FROM teams WHERE
	nba_url_code
	`;
};
