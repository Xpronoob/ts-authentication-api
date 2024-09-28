import { addressUser } from './user.entity'

export class PublicUserEntity {
  constructor(
    public id?: string,
    public name?: string,
    public email?: string,
    public roles?: string[],
    public _id?: string,
    public lastname?: string,
    public password?: string,
    public img?: string,
    public phone?: string,
    public address?: addressUser,
  ) {}
}
