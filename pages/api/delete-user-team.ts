import { NextApiRequest, NextApiResponse } from 'next';
import { deleteUserTeamPair } from '../../util/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // const { userId, teamId } = req.body;
  // const sessionToken = req.cookies.session;

  // console.log(req.body);
  const userId = Number(req.body.userIdNr);
  const teamId = Number(req.body.teamIdNr);

  const userTeamPair = await deleteUserTeamPair(userId, teamId);

  // console.log(userTeamPair);

  res.send({
    userTeamPair: userTeamPair,
  });
}
