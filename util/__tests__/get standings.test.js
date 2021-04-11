const axios = require('axios');

test('get standings', () => {
  const options = {
    method: 'GET',
    url: `http://data.nba.net/10s/prod/v1/current/standings_conference.json`,
    params: {},
    headers: {},
  };
  axios
    .request(options)
    .then(function (response) {
      const standArray = response.data;

      const result = standArray;

      expect(result).not.arrayContaining(null);

      return standArray;
    })
    .catch(function (error) {
      console.error(error);
    });
});
