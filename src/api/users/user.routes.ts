import express from 'express';

import { authenticateAccess } from '../../middlewares/authentication';
import { onValidationError } from '../../middlewares/validation-error';

import { UserControllers } from './user.controllers';
import { statusValidation } from './user.validations';

const router = express.Router();

router
    .use(authenticateAccess)
    .get('/status', UserControllers.getStatus)
    .patch('/status', statusValidation, onValidationError, UserControllers.updateStatus);

export { router };

/**
 * @openapi
 * /users/status:
 *   get:
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Gets the status attribute from the authenticated user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 status:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HttpError'
 *     security:
 *       - bearerAuth: []
 *   patch:
 *     tags:
 *       - Users
 *     requestBody:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              status:
 *                type: string
 *     responses:
 *       200:
 *         description: Updates the status attribute from the authenticated user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 status:
 *                   type: string
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HttpError'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HttpError'
 *     security:
 *       - bearerAuth: []
 */
