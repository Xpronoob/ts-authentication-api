import { UserEntity } from '../../domain/entities/user.entity'

export class PublicUserMapper {
  static userEntityFromObject(object: any): UserEntity {
    const { _id, id, name, email, img, roles, lastname, phone, address } = object

    return new UserEntity(
      // _id || '',
      id || '',
      name || '',
      email || '',
      // '', // password
      roles || [],
      '',
      _id || '',
      lastname || '',
      img || '',
      phone || '',
      address || '',
    )
  }
  
  static userEntityArrayFromObjectArray(objects: any[]): UserEntity[] {
    return objects.map(obj => this.userEntityFromObject(obj))
  }
}
