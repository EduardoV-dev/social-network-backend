import { body, type ValidationChain } from 'express-validator';

export const logIn: ValidationChain[] = [
    body('email').trim().isEmail().withMessage('Email is not valid'),
    body('password', 'Password must have at least 5 characters').trim().isLength({ min: 5 }),
];

export const signUp: ValidationChain[] = [
    ...logIn,
    body('name', 'Name can not be empty').trim().notEmpty(),
];
