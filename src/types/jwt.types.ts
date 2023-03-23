import { User } from '../api/users/user.models';

export interface JWTUserPayload
    extends Pick<User, '_id' | 'name' | 'email' | 'status' | 'active'> {}
