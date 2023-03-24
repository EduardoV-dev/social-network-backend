import { model, Schema } from 'mongoose';

import { Entity, EntityDocument } from '../../types/models.types';
import { User } from '../users/user.models';

export interface PostRequest {
    active: boolean;
    content: string;
    creator: string | Partial<User>;
    image: string;
    title: string;
}

export interface Post extends Entity<PostRequest> {}
export interface PostDocument extends EntityDocument<Post> {}

const postSchema = new Schema<PostDocument>(
    {
        active: { type: Boolean, default: true },
        content: { type: String, required: true },
        creator: { ref: 'User', required: true, type: Schema.Types.ObjectId },
        image: { type: String, required: true },
        title: { type: String, required: true },
    },
    { timestamps: true, versionKey: false },
);

export const PostModel = model<PostDocument>('Post', postSchema);

/**
 * @openapi
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - content
 *         - title
 *         - image
 *       properties:
 *         _id:
 *           type: string
 *         active:
 *           type: boolean
 *         content:
 *           type: string
 *         creator:
 *           type: string
 *         image:
 *           type: string
 *           format: binary
 *         title:
 *           type: string
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 */
