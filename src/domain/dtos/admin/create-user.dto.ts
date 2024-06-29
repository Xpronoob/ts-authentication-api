import { Validators } from '../../../config'

export class CreateUserDto {
  private constructor (
    public name: string,
    public email: string,
    public password: string,
    public roles: string[],
    public img?: string
  ) {}

  static create (object: { [key: string]: any }): [string?, CreateUserDto?] {
    const { name, email, password, roles, img } = object

    const normalizedEmail = email.toLowerCase()

    if (!name) return ['Missing name']
    if (!normalizedEmail) return ['Missing email']
    if (!Validators.email.test(email)) return ['Invalid email']
    if (!password) return ['Missing password']
    if (!Validators.password.test(password)) return ['Invalid password']

    return [
      undefined,
      new CreateUserDto(
        name, normalizedEmail, password, roles, img
      )
    ]
  }
}
