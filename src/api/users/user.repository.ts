import { User, UserDocument, UserModel } from './user.models';

type UserCRUD = Pick<Global.CRUD, 'create'> & {
    findByEmail: (email: string) => Promise<UserDocument>;
};

class UserRepositoryClass implements UserCRUD {
    public create = (resource: User): Promise<UserDocument> => UserModel.create(resource);

    public findByEmail = (email: string) => UserModel.findOne({ email }) as Promise<UserDocument>;
}

export const UserRepository = new UserRepositoryClass();
