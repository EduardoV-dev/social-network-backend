import { Document, model, Schema } from 'mongoose';

import { User } from '../users/user.models';

export interface RequestPost {
    content: string;
    creator: string | User;
    image: string;
    title: string;
}

export interface PostDocument extends RequestPost, Document<RequestPost> {}
export interface Post extends RequestPost {}

const postSchema = new Schema<RequestPost>(
    {
        content: { type: String, required: true },
        creator: { ref: 'User', required: true, type: Schema.Types.ObjectId },
        image: { type: String, required: true },
        title: { type: String, required: true },
    },
    { timestamps: true, versionKey: false },
);

export const PostModel = model<PostDocument>('Post', postSchema);
