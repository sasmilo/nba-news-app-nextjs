import { NextApiRequest, NextApiResponse } from 'next';
import { createUserTeamPair, getUserIdByToken } from '../../util/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const userIdNr = await getUserIdByToken(req.cookies.session);
  // console.log(userIdNr);

  if (!userIdNr) {
    return res.status(401).send({ message: 'You are unauthorised to do this' });
  }

  const teamIdNr = req.body.teamIdNr;

  const userId = userIdNr.userId;
  const teamId = Number(teamIdNr);

  const userTeamPair = await createUserTeamPair(userId, teamId);

  // console.log(userTeamPair);

  res.send({
    userTeamPair: userTeamPair,
  });
}
