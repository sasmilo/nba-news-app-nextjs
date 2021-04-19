import { NextApiRequest, NextApiResponse } from 'next';
import { createUserTeamPair, getUserIdByToken } from '../../util/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const userIdNr = await getUserIdByToken(req.cookies.session);


  if (!userIdNr) {
    return res.status(401).send({ message: 'You are unauthorized to do this' });
  }

  const teamIdNr = req.body.teamIdNr;

  const userId = userIdNr.userId;
  const teamId = Number(teamIdNr);

  const userTeamPair = await createUserTeamPair(userId, teamId);



  res.send({
    userTeamPair: userTeamPair,
  });
}
