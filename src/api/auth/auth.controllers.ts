import { NextFunction, Request, Response } from 'express';

import { AuthServices } from './auth.services';

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newUser = await AuthServices.signUp(req.body);
        res.status(201).send(newUser);
    } catch (error) {
        next(error);
    }
};

export const logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token: string = await AuthServices.logIn(req.body);
        res.status(200).send({ token });
    } catch (error) {
        next(error);
    }
};
