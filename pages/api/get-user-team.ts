import { NextApiRequest, NextApiResponse } from 'next';
import { getUsersFavTeams } from '../../util/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // const { userId, teamId } = req.body;
  // const sessionToken = req.cookies.session;

  // console.log(req.body);
  const userId = Number(req.body.userIdNr);

  const usersFavTeams = await getUsersFavTeams(userId);

  // console.log(usersFavTeams);

  res.send({ usersFavTeams: usersFavTeams });
}
