const axios = require('axios');

export default async function getStandings() {
  const options = {
    method: 'GET',
    url: 'https://data.nba.net/10s/prod/v1/current/standings_conference.json',
    params: {},
    headers: {},
  };
  const standingsArray = await axios
    .request(options)
    .then(function (response) {
      // console.log(response.data);
      const standArray = response.data;
      return standArray;
    })
    .catch(function (error) {
      console.error(error);
    });
  return standingsArray;
}
