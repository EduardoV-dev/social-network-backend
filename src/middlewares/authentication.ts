import { NextFunction, Request, Response } from 'express';
import jsonwebtoken from 'jsonwebtoken';

import { JWT_SECRET } from '../constants/env-variables';
import { HttpError } from '../lib/http-error';
import { JWTUserPayload } from '../types/jwt.types';

/**
 * Authentication middleware to determine if there was a provided token for authentication with JWT, if no Bearer token was provided or the token is expired or not valid, user could not be authenticated, therefore, will not be able to do any action, but authentication workflow.
 *
 * If user is authenticated, userId will be set into a `res.locals` as userId `(res.locals.userId)` for future authenticated requests.
 *
 * @throws Unauthorized error
 *
 * @param req Request object
 * @param res Response object
 * @param next Next function
 */
export const authenticateAccess = (req: Request, res: Response, next: NextFunction) => {
    const bearerToken: string | undefined = req.headers.authorization;
    if (!bearerToken) throw new HttpError('No token was provided', 401);
    const token: string = bearerToken.replace('Bearer ', '');

    try {
        const decodedToken = jsonwebtoken.verify(token, JWT_SECRET) as JWTUserPayload;
        res.locals.userId = decodedToken._id;
    } catch (error) {
        next(new HttpError('Unauthorized', 401));
    } finally {
        next();
    }
};
