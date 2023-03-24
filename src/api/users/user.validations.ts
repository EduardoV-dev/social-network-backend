import { body, type ValidationChain } from 'express-validator';

export const statusValidation: ValidationChain[] = [
    body('status', 'Status is not a string').isString(),
];
