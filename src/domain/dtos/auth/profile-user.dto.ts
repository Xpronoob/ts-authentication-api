export class ProfileUserDto {
  constructor (
    public name: string,
    public email: string,
    public roles: object[]
  ) {}

  static create (object: { [key: string]: any }): [string?, ProfileUserDto?] {
    const { name, email, roles } = object

    if (!name) return ['Missing name']
    if (!email) return ['Missing email']
    if (!roles) return ['Missing roles']

    return [
      undefined,
      new ProfileUserDto(
        name, email, roles
      )
    ]
  }
}
