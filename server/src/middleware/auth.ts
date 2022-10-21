import { RequestHandler } from 'express';
import { User } from '.prisma/client';

import { GetUserFromToken } from '../services/user/index';

const auth: RequestHandler = async (req, res, next) => {
  try {
    const token: string = req.cookies.token || req.headers.authorization;
    if (!token) {
      throw new Error('UnAuthenticated');
    }

    const user = (await GetUserFromToken(token)) as User;

    if (!user) {
      throw new Error('UnAuthenticated');
    }

    req.user = user;

    next();
  } catch (error) {
    res.clearCookie('token');
    res.status(401).send({
      message: 'Not authenticated',
    });
  }
};

export default auth;
