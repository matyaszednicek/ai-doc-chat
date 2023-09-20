import { getUserBySessionToken } from '../db/users';
import { NextFunction, Request, Response } from 'express';
import { get, merge } from 'lodash';

export const isOwner = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, 'identity._id') as unknown as string;

    if (!currentUserId) return res.status(403).json({ error: 'User ID not found!' });

    if (currentUserId.toString() !== id) return res.status(403).json({ error: 'User ID not found!' });

    next();
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader === 'undefined') return res.status(403).json({ error: 'User is not authenticated!' });

    const bearer = bearerHeader.split(' ');
    const token = bearer[1];

    const existingUser = await getUserBySessionToken(token);

    if (!existingUser) return res.status(403).json({ error: 'User is not authenticated!' });

    merge(req, { identity: existingUser });

    next();
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};
