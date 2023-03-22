import Express from 'express';

import { onValidationError } from '../../middlewares/validation-error';

import * as controllers from './auth.controllers';
import * as validations from './auth.validations';

const router = Express.Router();

router
    .post('/login', validations.logIn, onValidationError, controllers.logIn)
    .post('/signup', validations.signUp, onValidationError, controllers.signUp);

export { router };
