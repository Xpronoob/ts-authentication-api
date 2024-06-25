import { Validators } from '../../../config/validators'

export class LoginUserDto {
  constructor (
    public email: string,
    public password: string
  ) {}

  static create (object: { [key: string]: any }): [string?, LoginUserDto?] {
    const { email, password } = object

    const normalizedEmail = email.toLowerCase()

    if (!normalizedEmail) return ['Missing email']
    if (!Validators.email.test(email)) return ['Invalid email']

    if (!password) return ['Missing password']
    if (password.length < 6) return ['Password must be at least 6 characters long']

    return [
      undefined,
      new LoginUserDto(
        normalizedEmail, password
      )
    ]
  }
}
