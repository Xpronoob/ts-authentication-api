import { Validators } from '../../../config'

export class UpdateUserDto {
  private constructor(
    public id: string,
    public name?: string,
    public email?: string,
    public password?: string,
    public roles?: string[],
    public img?: string,
  ) {}

  static create(id: string, object: { [key: string]: any }): [string?, UpdateUserDto?] {
    const { name, email, password, roles, img } = object
    const updateFields: { [key: string]: any } = { name, email, password, roles, img }

    if (!id) return ['Missing id']
    if (email) {
      updateFields.email = email.toLowerCase()
      if (!Validators.email.test(email)) return ['Invalid email']
    }
    if (password) {
      updateFields.password = password
      if (!Validators.password.test(password)) return ['Invalid password']
    }

    return [
      undefined,
      new UpdateUserDto(
        id,
        updateFields.name,
        updateFields.email,
        updateFields.password,
        updateFields.roles,
        updateFields.img,
      ),
    ]
  }
}
