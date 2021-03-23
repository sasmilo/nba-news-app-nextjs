import GetDate from '../../components/GetDate';

const axios = require('axios');

export default async function GetChosenScores() {
  // const date = '20210318';
  const date = await GetDate();

  const options = {
    method: 'GET',
    url: `http://data.nba.net/10s/prod/v2/${date}/scoreboard.json`,
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

export async function getServerSideProps(context) {
  // console.log('c', context);

  const date = context.req.cookies.gamedate;
  const dateCookieValue = date ? JSON.parse(date) : [];

  return {
    props: {
      dateCookieValue: dateCookieValue,
    },
  };
}
