import { UserEntity } from '../../domain/entities/user.entity'

export class PublicUserMapper {
  static userEntityFromObject(object: any): UserEntity {
    const { _id, id, name, email, img, roles } = object

    return new UserEntity(
      _id || '',
      id || '',
      name || '',
      email || '',
      // '', // password
      roles || [],
      img || '',
    )
  }

  static userEntityArrayFromObjectArray(objects: any[]): UserEntity[] {
    return objects.map(obj => this.userEntityFromObject(obj))
  }
}
