import { UserDocument, UserModel, UserRequest } from './user.models';

type UserCRUD = Pick<Global.CRUD, 'create'> & {
    findByEmail: (email: string) => Promise<UserDocument>;
};

class UserRepositoryClass implements UserCRUD {
    public create = (resource: UserRequest) =>
        new UserModel(resource).save() as Promise<UserDocument>;

    public findByEmail = (email: string) => UserModel.findOne({ email }) as Promise<UserDocument>;
}

export const UserRepository = new UserRepositoryClass();
