import express from 'express';

import { authenticateAccess } from '../../middlewares/authentication';

import { UserControllers } from './user.controllers';

const router = express.Router();

router
    .use(authenticateAccess)
    .get('/status', UserControllers.getStatus)
    .patch('/status', UserControllers.updateStatus);

export { router };
