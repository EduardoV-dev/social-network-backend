import { Document } from 'mongoose';

/**
 * T stands for the Request interface for any entity, Request interface is the one that needs to be sent for creating a record into an entity.
 *
 * @example
 * interface RequestUser {
 *    name: string;
 *    ...
 * }
 *
 * interface User extends Entity<RequestUser> {}
 */
export type Entity<T> = T & Global.BaseEntity;

/**
 * K Stands for the result of using `Entity<T>`
 *
 * @example
 * interface User extends Entity<RequestUser> {}
 *
 * interface UserDocument extends EntityDocument<User> {}
 */
export type EntityDocument<K> = Entity<K> & Document;
