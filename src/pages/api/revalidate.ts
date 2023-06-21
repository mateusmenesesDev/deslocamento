import { NextApiRequest, NextApiResponse } from 'next';

import httpStatus from '../../constants/httpStatus';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const path = req.query.path as string;
    if (!path) return res.status(httpStatus.badRequest);
    await res.revalidate(path);
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send('Error revalidating');
  }
}
