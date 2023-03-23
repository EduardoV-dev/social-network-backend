import { UserDocument } from './user.models';
import { UserRepository } from './user.repository';

class UserServicesClass {
    public getStatus = (userId: string): Promise<UserDocument> =>
        UserRepository.findStatusById(userId);

    public updateStatus = (userId: string, status: string): Promise<UserDocument> =>
        UserRepository.updateStatusById(userId, status);
}

export const UserServices = new UserServicesClass();
