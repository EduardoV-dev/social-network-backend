import express from 'express';

import { uploadSingleFile } from '../../lib/multer';
import { authenticate } from '../../middlewares/authentication';
import { onValidationError } from '../../middlewares/validation-error';

import { createPost, getPosts } from './post.controllers';
import { postValidation } from './post.validations';

const router = express.Router();

router
    .use(authenticate)
    .get('/', getPosts)
    .get('/:id', (req, res) => {
        res.status(200).send({ message: 'Post by id' });
    })
    .post('/', uploadSingleFile('image'), postValidation, onValidationError, createPost)
    .put('/', (req, res) => {
        res.status(201).send({ message: 'Updated' });
    })
    .delete('/', (req, res) => {
        res.status(200).send({ message: 'Deleted' });
    });

export { router };
