exports.up = async (sql) => {
  await sql`
	INSERT INTO teams (
		team_name,
		nba_id,
		nba_url_code,
		conference,
		division,
		city,
		nba_tricode
	)
	VALUES
	('Atlanta Hawks', 1610612737, 'hawks', 'Eastern', 'Southeast', 'Atlanta', 'ATL'),
	('Brooklyn Nets', 1610612751, 'nets', 'Eastern', 'Atlantic', 'New York', 'BKN'),
	('Boston Celtics', 1610612738, 'celtics', 'Eastern', 'Atlantic', 'Boston', 'BOS'),
	('Charlotte Hornets', 1610612766, 'hornets', 'Eastern', 'Southeast', 'Charlotte', 'CHA'),
	('Chicago Bulls', 1610612741, 'bulls', 'Eastern', 'Central', 'Chicago', 'CHI'),
	('Cleveland Cavaliers', 1610612739, 'cavaliers', 'Eastern', 'Central', 'Cleveland', 'CLE'),
	('Dallas Mavericks', 1610612742, 'mavericks', 'Western', 'Southwest', 'Dallas', 'DAL'),
	('Denver Nuggets', 1610612743, 'nuggets', 'Western', 'Northwest', 'Denver', 'DEN'),
	('Detroit Pistons', 1610612765, 'pistons', 'Eastern', 'Central', 'Detroit', 'DET'),
	('Golden State Warriors', 1610612744, 'warriors', 'Western', 'Pacific', 'San Francisco', 'GSW'),
	('Houston Rockets', 1610612745, 'rockets', 'Western', 'Southwest', 'Houston', 'HOU'),
	('Indiana Pacers', 1610612754, 'pacers', 'Eastern', 'Central', 'Indianapolis', 'IND'),
	('Los Angeles Clippers', 1610612746, 'clippers', 'Western', 'Pacific', 'Los Angeles', 'LAC'),
	('Los Angeles Lakers', 1610612747, 'lakers', 'Western', 'Pacific', 'Los Angeles', 'LAL'),
	('Memphis Grizzlies', 1610612763, 'grizzlies', 'Western', 'Southwest', 'Memphis', 'MEM'),
	('Miami Heat', 1610612748, 'heat', 'Eastern', 'Southeast', 'Miami', 'MIA'),
	('Milwaukee Bucks', 1610612749, 'bucks', 'Eastern', 'Central', 'Milwaukee', 'MIL'),
	('Minnesota Timberwolves', 1610612750, 'timberwolves', 'Western', 'Northwest', 'Minneapolis', 'MIN'),
	('New Orleans Pelicans', 1610612740, 'pelicans', 'Western', 'Southwest', 'New Orleans', 'NOP'),
	('New York Knicks', 1610612752, 'knicks', 'Eastern', 'Atlantic', 'New York', 'NYK'),
	('Oklahoma City Thunder', 1610612760, 'thunder', 'Western', 'Northwest', 'Oklahoma City', 'OKC'),
	('Orlando Magic', 1610612753, 'magic', 'Eastern', 'Southeast', 'Orlando', 'ORL'),
	('Philadelphia 76ers', 1610612755, 'sixers', 'Eastern', 'Atlantic', 'Philadelphia', 'PHI'),
	('Phoenix Suns', 1610612756, 'suns', 'Western', 'Pacific', 'Phoenix', 'PHX'),
	('Portland Trailblazers', 1610612757, 'blazers', 'Western', 'Northwest', 'Portland', 'POR'),
	('Sacramento Kings', 1610612758, 'kings', 'Western', 'Pacific', 'Sacramento', 'SAC'),
	('San Antonio Spurs', 1610612759, 'spurs', 'Western', 'Southwest', 'San Antonio', 'SAS'),
	('Toronto Raptors', 1610612761, 'raptors', 'Eastern', 'Atlantic', 'Toronto', 'TOR'),
	('Utah Jazz', 1610612762, 'jazz', 'Western', 'Northwest', 'Salt Lake City', 'UTA'),
	('Washington Wizards', 1610612764, 'wizards', 'Eastern', 'Southeast', 'Washington', 'WAS')

	`;
};

exports.down = async (sql) => {
  await sql`
	DELETE FROM teams WHERE
	nba_url_code = 'rockets'
	`;
};
