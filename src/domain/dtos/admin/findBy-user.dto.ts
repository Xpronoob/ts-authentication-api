export class FindByUserDto {
  private constructor (
    public name: string,
    public email: string,
    public roles: string[]
  ) {}

  static readonly allowedRoles = ['user_role', 'admin_role']

  static create (object: { [key: string]: any }): [string?, FindByUserDto?] {
    const { name, email, roles } = object
    // let normalizedName
    // let normalizedEmail
    // let normalizedRoles

    // if (name) { normalizedName = name.toLowerCase() }
    // if (email) { normalizedEmail = email.toLowerCase() }
    // if (roles) { normalizedRoles = roles.map((role: string) => role.toLowerCase()) }

    // // const invalidRoles = normalizedRoles.filter(role => !FindByUserDto.allowedRoles.includes(role))

    return [
      undefined,
      new FindByUserDto(
        name, email, roles
      )
    ]
  }
}
