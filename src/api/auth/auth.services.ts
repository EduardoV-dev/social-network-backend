import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';
import jsonwebtoken from 'jsonwebtoken';

import { JWT_SECRET } from '../../constants/env-variables';
import { HttpError } from '../../lib/http-error';
import { RequestUser, UserDocument, UserModel } from '../users/user.models';
import { UserRepository } from '../users/user.repository';

dotenv.config();

type AuthUser = Pick<RequestUser, 'email' | 'password'>;

const ENCRIPTION_SALT = 10;
const JWT_EXPIRATION_TIME = '1h';

class AuthServicesClass {
    public logIn = async (user: AuthUser): Promise<string> => {
        const userFromDB: UserDocument = await UserRepository.findByEmail(user.email);
        if (!userFromDB) throw new HttpError('No account with provided email exists.', 404);

        const isPasswordCorrect: boolean = await bcryptjs.compare(
            user.password,
            userFromDB.password,
        );

        if (!isPasswordCorrect) throw new HttpError('Password is incorrect', 400);

        const responseUser: Partial<UserDocument> = {
            email: userFromDB.email,
            name: userFromDB.name,
            _id: userFromDB._id,
            status: userFromDB.status,
        };
        const token: string = jsonwebtoken.sign(responseUser, JWT_SECRET, {
            expiresIn: JWT_EXPIRATION_TIME,
        });
        return token;
    };

    public signUp = async (user: RequestUser): Promise<Partial<UserDocument>> => {
        const userExists: UserDocument = await UserRepository.findByEmail(user.email);
        if (userExists) throw new HttpError('Specified email is being used by another user.', 400);

        // const {active, , ...requestUser} = user;

        // const newUser = new UserModel(requestUser).save();

        const encryptedPassword: string = await bcryptjs.hash(user.password, ENCRIPTION_SALT);
        const newUser = await UserModel.create({
            ...user,
            password: encryptedPassword,
        });

        const userResponse: Partial<UserDocument> = {
            _id: newUser._id,
            email: newUser.email,
            name: newUser.name,
            status: newUser.status,
        };
        return userResponse;
    };
}

export const AuthServices = new AuthServicesClass();
