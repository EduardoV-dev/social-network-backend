import { body, ValidationChain } from 'express-validator';

export const postValidation: ValidationChain[] = [
    body('title', 'Title cannot be empty and must have at least 5 characters')
        .trim()
        .isLength({ min: 5 }),
    body('content', 'Content cannot be empty and must have at least 5 characters')
        .trim()
        .isLength({ min: 5 }),
    body('creator', 'Creator cannot be empty').trim().notEmpty(),
];
