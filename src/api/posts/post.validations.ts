import { body, ValidationChain } from 'express-validator';

export const postValidators: ValidationChain[] = [
    body('title', 'Title cannot be empty and must have at least 5 characters')
        .trim()
        .isLength({ min: 5 }),
    body('content', 'Content cannot be empty and must have at least 5 characters')
        .trim()
        .isLength({ min: 5 }),
    body('active', 'Active is not a boolean').isBoolean(),
];
