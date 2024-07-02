export class PublicUserEntity {
  constructor (
    // public _id?: string,
    // public id?: string,
    public name?: string,
    public email?: string,
    // public password?: string,
    public roles?: string[],
    public img?: string
    // public __v?: number
  ) {}
}
