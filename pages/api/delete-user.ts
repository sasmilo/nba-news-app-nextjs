import { NextApiRequest, NextApiResponse } from 'next';
import { deleteUser } from '../../util/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // const { userId, teamId } = req.body;
  // const sessionToken = req.cookies.session;

  // console.log(req.body);
  const userId = Number(req.body.userIdNr);

  const deletedUser = await deleteUser(userId);

  console.log(deletedUser);

  res.send({ deletedUser: deletedUser });
}
