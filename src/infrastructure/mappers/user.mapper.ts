import { CustomError } from '../../domain/errors/custom.error'
import { UserEntity } from '../../domain/entities/user.entity'

export class UserMapper {
  static userEntityFromObject(object: { [key: string]: any }) {
    const { id, _id, name, email, password, roles, img, lastname, phone, address } = object

    if (!_id && !id) {
      throw CustomError.badRequest('Missing id')
    }
    if (!name) throw CustomError.badRequest('Missing name')
    if (!email) throw CustomError.badRequest('Missing email')
    if (!roles) throw CustomError.badRequest('Missing roles')

    const safePassword = password ?? undefined
    const safeImg = img ?? undefined
    const safeLastname = lastname ?? undefined
    const safePhone = phone ?? undefined
    const safeAddress = address ?? undefined

    // Retorno de la nueva entidad
    return new UserEntity(
      _id || id,
      name,
      email,
      roles,
      safePassword, // Si no hay password, es undefined
      _id,
      safeLastname,
      safeImg,
      safePhone,
      safeAddress,
    )
  }
}
