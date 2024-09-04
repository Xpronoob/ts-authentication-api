export class DeleteUserDto {
  private constructor(
    public id?: string,
    public email?: string,
  ) {}

  static create(id: string, object: { [key: string]: any }): [string?, DeleteUserDto?] {
    const { email } = object

    if (!id && !email) return ['Missing user id or email']

    const normalizedEmail = email?.toLowerCase()

    return [undefined, new DeleteUserDto(id, normalizedEmail)]
  }
}
