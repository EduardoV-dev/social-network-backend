import express from 'express';

import { HttpError } from '../lib/http-error';

export const errorHandler = (
    error: HttpError,
    _req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    res.status(error.statusCode || 500).json({
        message: error.message || 'Internal Server Error',
    });
    next();
};
