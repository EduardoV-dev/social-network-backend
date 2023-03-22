import { NextFunction, Request, Response } from 'express';
import { validationResult, type ValidationError } from 'express-validator';

export const onValidationError = (req: Request, res: Response, next: NextFunction): void => {
    const errors: ValidationError[] = validationResult(req).array();
    const hasErrors: boolean = errors.length > 0;

    if (hasErrors) {
        const errorsResponse: string[] = errors.map((error) => error.msg);
        res.status(400).send({ errors: errorsResponse });
    }

    next();
};
