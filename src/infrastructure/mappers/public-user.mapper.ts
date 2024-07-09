import { PublicUserEntity } from '../../domain/entities/public-user.entity'

export class PublicUserMapper {
  static userEntityFromObject(object: any): PublicUserEntity {
    const { name, email, img, roles } = object

    return new PublicUserEntity(
      // _id || '',
      // id || '',
      name || '',
      email || '',
      // '', // password
      roles || [],
      img || '',
    )
  }

  static userEntityArrayFromObjectArray(objects: any[]): PublicUserEntity[] {
    return objects.map(obj => this.userEntityFromObject(obj))
  }
}
