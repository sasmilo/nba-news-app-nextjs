export default async function GetDate() {
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
  // const newDate = Cookies.get('gamedate');
  // setDate(newDate);
  return date;
}
