import { NextFunction, Request, Response } from 'express';

import { UserServices } from './user.services';

class UserControllersClass {
    public getStatus = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const response = await UserServices.getStatus(res.locals.userId);
            res.status(200).send(response);
        } catch (error) {
            next(error);
        }
    };

    public updateStatus = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const response = await UserServices.updateStatus(res.locals.userId, req.body.status);
            res.status(200).send(response);
        } catch (error) {
            next(error);
        }
    };
}

export const UserControllers = new UserControllersClass();
