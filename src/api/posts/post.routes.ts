import express from 'express';

import { uploadSingleFile } from '../../lib/multer';
import { authenticateAccess } from '../../middlewares/authentication';
import { onValidationError } from '../../middlewares/validation-error';

import { PostControllers } from './post.controllers';
import { postValidators } from './post.validations';

const router = express.Router();

const uploadMiddleware = uploadSingleFile('image');

router
    .use(authenticateAccess)
    .get('/', PostControllers.getPosts)
    .post('/', uploadMiddleware, postValidators, onValidationError, PostControllers.createPost)
    .get('/:id', PostControllers.getPost)
    .put('/:id', uploadMiddleware, postValidators, onValidationError, PostControllers.updatePost)
    .delete('/:id', PostControllers.deletePost);

export { router };
