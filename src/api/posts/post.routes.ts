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

/**
 * @openapi
 * /posts:
 *   get:
 *     tags:
 *       - Posts
 *     description: Get posts, can be paginated if passing `page` as query parameter
 *     responses:
 *       200:
 *         description: Paginated posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HttpError'
 *     security:
 *       - bearerAuth: []
 *   post:
 *     tags:
 *       - Posts
 *     description: Create a new post by passing a title, content and image. data has to be sent as `multipart/form-data`
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       201:
 *         description: New post created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: Bad request, due to validation
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

/**
 * @openapi
 * /posts/:id:
 *   get:
 *     tags:
 *       - Posts
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Gets a single post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HttpError'
 *       404:
 *         description: Post not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HttpError'
 *     security:
 *       - bearerAuth: []
 *   put:
 *     tags:
 *       - Posts
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: Updates a post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: Bad request, due to validation
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
 *       404:
 *         description: Post to update not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HttpError'
 *     security:
 *       - bearerAuth: []
 *   delete:
 *     tags:
 *       - Posts
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Deletes a post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HttpError'
 *       404:
 *         description: Post to delete not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HttpError'
 *     security:
 *       - bearerAuth: []
 */
