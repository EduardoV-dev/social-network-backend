import { NextFunction, Request, Response } from 'express';
import { validationResult, type ValidationError } from 'express-validator';

/**
 * Validation error middleware that will return error responses for any validation implemented with `express-validator`, for using this middleware, it has to be placed after validation rules.
 *
 * @example
 * router.post('/users', userValidations, onValidationError, UserControllers.createUser);
 *
 * @param req Request object
 * @param res Response object
 * @param next next function
 */
export const onValidationError = (req: Request, res: Response, next: NextFunction): void => {
    const errors: ValidationError[] = validationResult(req).array();
    const hasErrors: boolean = errors.length > 0;

    if (hasErrors) {
        const errorsResponse: string[] = errors.map((error) => error.msg);
        res.status(400).send({ errors: errorsResponse });
    }

    next();
};
