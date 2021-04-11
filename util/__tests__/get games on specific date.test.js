const axios = require('axios');

const newDateWithoutDashes = '20210404';

test('get scores for selected date', () => {
  const options = {
    method: 'GET',
    url: `http://data.nba.net/10s/prod/v2/${newDateWithoutDashes}/scoreboard.json`,
    params: {},
    headers: {},
  };
  axios
    .request(options)
    .then(function (response) {
      const scoresArray = response.data.games;

      const result = scoresArray;

      expect(result).not.arrayContaining(null);

      return scoresArray;
    })
    .catch(function (error) {
      console.error(error);
    });
});
