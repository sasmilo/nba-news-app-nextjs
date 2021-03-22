const axios = require('axios');

export default async function GetChosenScores() {
  const yesterday = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24)
    .toISOString()
    .slice(0, 10);
  // console.log(props);
  // const date = props.gamedate;
  // const date = Cookies.get('gamedate');
  // console.log(date);
  // const dateForApi = date.replaceAll('-', '');
  // console.log(props.newsArray);
  // console.log(props.scoresArray[0].vTeam.triCode);
  // const [date, setDate] = useState(yesterday);
  const date = '20210318';

  const options = {
    method: 'GET',
    url: `http://data.nba.net/10s/prod/v1/${date}/scoreboard.json`,
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
