import { describe, expect, test } from '@jest/globals'
import { UserMapper } from '../../../src/infrastructure/mappers/user.mapper'
import { UserEntity } from '../../../src/domain/entities/user.entity'

describe('User Mapper', () => {
  test('should map user to user entity', () => {
    const input = {
      _id: 'id_test',
      name: 'name',
      email: 'email@email.com',
      password: 'Password1!',
      roles: ['roles', 'roles'],
      img: 'img',
    }

    const expected = new UserEntity(input._id, input.name, input.email, input.password, input.roles, input.img)

    const result = UserMapper.userEntityFromObject(input)

    expect(result).toEqual(expected)
  })
})
