import { UserDocument, UserModel, UserRequest } from './user.models';

type UserCRUD = Pick<Global.CRUD, 'create'> & {
    findStatusById: (_id: string) => Promise<UserDocument>;
    findByEmail: (email: string) => Promise<UserDocument>;
    updateStatusById: (_id: string, status: string) => Promise<UserDocument>;
};

class UserRepositoryClass implements UserCRUD {
    public create = (resource: UserRequest) =>
        new UserModel(resource).save() as Promise<UserDocument>;

    public findStatusById = (_id: string) =>
        UserModel.findById(_id).select(['status']) as Promise<UserDocument>;

    public updateStatusById = (_id: string, status: string) =>
        UserModel.findByIdAndUpdate(_id, { status } as UserRequest, {
            new: true,
            fields: ['status'],
        }) as Promise<UserDocument>;

    public findByEmail = (email: string) => UserModel.findOne({ email }) as Promise<UserDocument>;
}

export const UserRepository = new UserRepositoryClass();
