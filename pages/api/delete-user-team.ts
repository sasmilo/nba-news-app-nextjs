import { NextApiRequest, NextApiResponse } from 'next';
import { doesCsrfTokenMatchSessionToken } from '../../util/auth';
import { deleteUserTeamPair } from '../../util/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { userIdNr, teamIdNr, csrfToken } = req.body;
  const sessionToken = req.cookies.session;

  if (!doesCsrfTokenMatchSessionToken(csrfToken, sessionToken)) {
    return res.status(401).send({
      errors: [{ message: 'CSRF Token does not match' }],
      user: null,
    });
  }

  const userId = Number(userIdNr);
  const teamId = Number(teamIdNr);

  const userTeamPair = await deleteUserTeamPair(userId, teamId);

  // console.log(userTeamPair);

  res.send({
    userTeamPair: userTeamPair,
  });
}
