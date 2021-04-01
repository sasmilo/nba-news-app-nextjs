const axios = require('axios');

export default async function GetLastNightScores() {
  const yesterday = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24)
    .toISOString()
    .slice(0, 10);

  const yesterdayWithoutDashes = yesterday.replaceAll('-', '');

  const options = {
    method: 'GET',
    url: `http://data.nba.net/10s/prod/v1/${yesterdayWithoutDashes}/scoreboard.json`,
    params: {},
    headers: {},
  };
  const scoresArray = await axios
    .request(options)
    .then(function (response) {
      // console.log(response.data.games);
      const scArray = response.data.games;
      return scArray;
    })
    .catch(function (error) {
      console.error(error);
    });
  return scoresArray;
}
