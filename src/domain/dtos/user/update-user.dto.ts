import { addressUser } from 'domain/entities'
import { Validators } from '../../../config'

export class UpdateUserDto {
  private constructor(
    public id: string,
    public name?: string,
    public email?: string,
    // public password?: string,
    public roles?: string[],
    public img?: string,
    public lastname?: string,
    public phone?: string,
    public address?: addressUser,
  ) {}

  static create(id: string, object: { [key: string]: any }): [string?, UpdateUserDto?] {
    const { name, email, roles, img, lastname, phone, address } = object
    const updateFields: { [key: string]: any } = { email }

    if (!id) return ['Missing id']
    if (email) {
      updateFields.email = email.toLowerCase()
      if (!Validators.email.test(email)) return ['Invalid email']
    }
    // if (password) {
    //   updateFields.password = password
    //   if (!Validators.password.test(password)) return ['Invalid password']
    // }

    return [
      undefined,
      new UpdateUserDto(
        id,
        name,
        updateFields.email,
        roles,
        img,
        lastname,
        phone,
        address,
      ),
    ]
  }
}
