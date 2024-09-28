export interface addressUser {
  street?: string
  city?: string
  state?: string
  zip?: string
  country?: string
}

export class UserEntity {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public roles: string[],
    public password?: string,
    public _id?: string,
    public lastname?: string,
    public img?: string,
    public phone?: string,
    public address?: addressUser,
  ) {}
}
