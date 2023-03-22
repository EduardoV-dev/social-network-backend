import { model, Schema, Document } from 'mongoose';

import { RequestPost } from '../posts/post.models';

export interface RequestUser {
    active: boolean;
    email: string;
    name: string;
    password: string;
    posts: RequestPost[];
    status: string;
}

export interface User extends Global.BaseEntity {}
export interface UserDocument extends Document, RequestUser {}

const userSchema = new Schema<RequestUser>(
    {
        active: { type: Boolean, default: true },
        email: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        password: { type: String, required: true },
        status: { type: String, required: true, default: 'I am new' },
        posts: [
            {
                default: [],
                ref: 'Post',
                type: Schema.Types.ObjectId,
            },
        ],
    },
    { timestamps: true, versionKey: false },
);

userSchema.pre<UserDocument>('save', () => {
    console.log(this);
});

export const UserModel = model<Partial<RequestUser>>('User', userSchema);
