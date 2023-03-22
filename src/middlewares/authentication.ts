import { NextFunction, Request, Response } from 'express';
import jsonwebtoken from 'jsonwebtoken';

import { JWT_SECRET } from '../constants/env-variables';
import { HttpError } from '../lib/http-error';

export const authenticate = (req: Request, _res: Response, next: NextFunction) => {
    const bearerToken: string | undefined = req.headers.authorization;
    if (!bearerToken) throw new HttpError('Not authenticated', 401);

    const token: string = bearerToken.replace('Bearer ', '');
    console.log(token);

    try {
        const decodedToken = jsonwebtoken.verify(token, JWT_SECRET);
        if (!decodedToken) throw new HttpError('Not authenticated', 401);
        console.log(decodedToken);
    } catch (error) {
        next(error);
    }

    next();
};
