import Express from 'express';

import { onValidationError } from '../../middlewares/validation-error';

import * as controllers from './auth.controllers';
import * as validations from './auth.validations';

const router = Express.Router();

router
    .post('/login', validations.logIn, onValidationError, controllers.logIn)
    .post('/signup', validations.signUp, onValidationError, controllers.signUp);

export { router };

/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     description: Login with existing account
 *     requestBody:
 *       required:
 *         - email
 *         - password
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: testing@testing.com
 *               password:
 *                 type: string
 *                 example: testing
 *     responses:
 *       200:
 *         description: Logins correctly, returns token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Client side error, due to validation
 */

/**
 * @openapi
 * /auth/signup:
 *   post:
 *     tags:
 *       - Auth
 *     description: Create new user account
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Client side error, due to validation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HttpError'
 */
