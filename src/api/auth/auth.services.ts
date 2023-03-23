import dotenv from 'dotenv';
import jsonwebtoken from 'jsonwebtoken';

import { JWT_SECRET } from '../../constants/env-variables';
import { HttpError } from '../../lib/http-error';
import { JWTUserPayload } from '../../types/jwt.types';
import { User, UserDocument, UserRequest } from '../users/user.models';
import { UserRepository } from '../users/user.repository';

dotenv.config();

type LoginUser = Pick<UserRequest, 'email' | 'password'>;
type SignUpResponse = Omit<User, 'password' | 'posts'>;

const JWT_EXPIRATION_TIME = '1h';

class AuthServicesClass {
    public logIn = async (user: LoginUser): Promise<string> => {
        const userFromDB: UserDocument = await UserRepository.findByEmail(user.email);
        if (!userFromDB) throw new HttpError('No account with provided email exists.', 404);

        const isPasswordCorrect: boolean = await userFromDB.comparePassword(user.password);
        if (!isPasswordCorrect) throw new HttpError('Password is incorrect', 400);

        const userInToken: JWTUserPayload = {
            _id: userFromDB._id,
            active: userFromDB.active,
            email: userFromDB.email,
            name: userFromDB.name,
            status: userFromDB.status,
        };

        const token: string = jsonwebtoken.sign(userInToken, JWT_SECRET, {
            expiresIn: JWT_EXPIRATION_TIME,
        });

        return token;
    };

    public signUp = async (user: UserRequest): Promise<SignUpResponse> => {
        const userExists: UserDocument = await UserRepository.findByEmail(user.email);
        if (userExists) throw new HttpError('Specified email is being used by another user.', 400);

        const newUser: UserDocument = await UserRepository.create(user);
        const userResponse: SignUpResponse = {
            _id: newUser._id.toString(),
            active: newUser.active,
            createdAt: newUser.createdAt,
            email: newUser.email,
            name: newUser.name,
            status: newUser.status,
            updatedAt: newUser.updatedAt,
        };

        return userResponse;
    };
}

export const AuthServices = new AuthServicesClass();
