import express from 'express';

import { HttpError } from '../lib/http-error';

/**
 * Error handler is an express error middleware that will catch any error from any route, middleware, controller or file that implements a try catch block and passes `HttpError` object into `next` function or using throwing errors by using `HttpError`
 *
 * @example
 * const someMiddleware = (req, res, next) => {
 *   try {
 *       // Some code that might end in error
 *   } catch (error) {
 *      next(error) // This is key
 *   }
 * }
 *
 * OR
 *
 * const someOtherThing = () => {
 *   if (someFailedCondition) throw new HttpError("Error message", 500);
 * }
 *
 * See HttpError middleware for more info about usage.
 *
 * @param error Custom error class for hanling errors in a better way
 * @param _req Request object
 * @param res Response object
 * @param next Next function
 */
export const errorHandler = (
    error: HttpError,
    _req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    res.status(error.statusCode || 500).send({
        message: error.message || 'Internal Server Error',
    });
    next();
};
