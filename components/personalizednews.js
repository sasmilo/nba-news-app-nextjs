export default async function getSpecialNewsFromLastTwoDays(favTeams) {
  const axios = require('axios').default;

  const options = {
    method: 'GET',
    url: 'https://free-news.p.rapidapi.com/v1/search',
    params: {
      q: `${favTeams}`,
      lang: 'en',
      sources:
        'nba.com, espn.com, bleacherreport.com, foxsports.com, hoopshype.com, realgm.com, sports.yahoo.com',
      page_size: 70,
    },
    headers: {
      'x-rapidapi-key': '1059d1e8fcmshfbea3f707e923ffp11cf21jsnf22363d410bc',
      'x-rapidapi-host': 'free-news.p.rapidapi.com',
    },
  };

  // const options = {
  //   method: 'GET',
  //   url: 'https://newsapi.org/v2/everything/',
  //   // 'https://newsapi.org/v2/sources/',
  //   params: {
  //     q: 'nba',
  //     domains:
  //       'nba.com,espn.com,bleacherreport.com,foxsports.com,news.google.com,spox.com',
  //     // from: '2021-03-16',
  //     // to: '2021-03-22',
  //     language: 'en',
  //     sortBy: 'publishedAt',
  //   },
  //   headers: {
  //     'x-api-key': '8a265a5d0c884dd2bd56d5c87eaad28d',
  //   },
  // };

  const newsDataArray = await axios
    .request(options)
    .then(function (response) {
      const newsArray = response.data.articles;
      return newsArray;
    })
    .catch(function (error) {
      console.error(error);
    });
  return newsDataArray;
}
