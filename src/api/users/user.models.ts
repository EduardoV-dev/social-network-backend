import bcrypt from 'bcryptjs';
import { model, Schema } from 'mongoose';

import { HttpError } from '../../lib/http-error';
import { Entity, EntityDocument } from '../../types/models.types';

export interface UserRequest {
    active: boolean;
    email: string;
    name: string;
    password: string;
    status: string;
}

export interface User extends Entity<UserRequest> {}
export interface UserDocument extends EntityDocument<User> {
    comparePassword: (password: string) => Promise<boolean>;
}

const userSchema = new Schema<UserDocument>(
    {
        active: { type: Boolean, default: true },
        email: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        password: { type: String, required: true },
        status: { type: String, required: true, default: 'I am new' },
    },
    { timestamps: true, versionKey: false },
);

const ENCRIPTION_SALT = 10;

userSchema.pre<UserDocument>('save', async function encryptPassword(next) {
    try {
        const encryptedPassword: string = await bcrypt.hash(this.password, ENCRIPTION_SALT);
        this.password = encryptedPassword;
        next();
    } catch (error) {
        next(new HttpError('There was an error while trying to encrypt the password', 500));
    }
});

userSchema.methods.comparePassword = function comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
};

export const UserModel = model<UserDocument>('User', userSchema);

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - name
 *         - password
 *       properties:
 *         _id:
 *           type: string
 *         active:
 *           type: boolean
 *         email:
 *           type: string
 *         name:
 *           type: string
 *         password:
 *           type: string
 *         status:
 *           type: string
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 */
