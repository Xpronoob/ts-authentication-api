import { Validators } from '../../../config'

export interface UserAdress {
  street?: string
  city?: string
  state?: string
  zip?: string
  country?: string
}

export class CreateUserDto {
  private constructor(
    public name: string,
    public email: string,
    public password: string,
    public roles: string[],
    public img?: string,
    public lastname?: string,
    public phone?: string,
    public address?: UserAdress,
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateUserDto?] {
    const { name, email, password, roles, img, lastname, phone, address } = object

    const normalizedEmail = email.toLowerCase()

    if (!name) return ['Missing name']
    if (!normalizedEmail) return ['Missing email']
    if (!Validators.email.test(email)) return ['Invalid email']
    if (!password) return ['Missing password']
    if (!Validators.password.test(password)) return ['Invalid password']

    return [undefined, new CreateUserDto(name, normalizedEmail, password, roles, img, lastname, phone, address)]
  }
}
