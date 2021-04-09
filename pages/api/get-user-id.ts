import { NextApiRequest, NextApiResponse } from 'next';
import { getUserIdByToken } from '../../util/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const userIdObject = await getUserIdByToken(req.cookies.session);
  const userId = await userIdObject.userId;

  // console.log(req.cookies.session);
  // console.log(userId);

  res.send({ userId: userId });
}
