export default async function getNewsFromLastTwoDays() {
  const axios = require('axios').default;

  const options = {
    method: 'GET',
    url: 'https://newsapi.org/v2/everything/',
    // 'https://newsapi.org/v2/sources/',
    params: {
      q: 'nba',
      domains:
        'nba.com,espn.com,bleacherreport.com,basketball.realgm.com,foxsports.com,news.google.com,spox.com',
      // from: '2021-03-16',
      // to: '2021-03-22',
      language: 'en',
      sortBy: 'publishedAt',
    },
    headers: {
      'x-api-key': '8a265a5d0c884dd2bd56d5c87eaad28d',
      // 'x-rapidapi-host': 'nba-stats4.p.rapidapi.com',
    },
  };

  const newsDataArray = await axios
    .request(options)
    .then(function (response) {
      // console.log(response.data);
      const newsArray = response.data.articles;
      return newsArray;
    })
    .catch(function (error) {
      console.error(error);
    });
  return newsDataArray;
}
