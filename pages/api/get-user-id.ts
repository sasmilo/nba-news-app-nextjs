import { NextApiRequest, NextApiResponse } from 'next';
import { doesCsrfTokenMatchSessionToken } from '../../util/auth';
import { getUserIdByToken } from '../../util/database';

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

  const userIdObject = await getUserIdByToken(req.cookies.session);
  const userId = await userIdObject.userId;

  // console.log(req.cookies.session);
  // console.log(userId);

  res.send({ userId: userId });
}
