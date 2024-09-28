import { describe, expect, test } from '@jest/globals'
import { UserMapper } from '../../../src/infrastructure/mappers/user.mapper'
import { UserEntity } from '../../../src/domain/entities/user.entity'

describe('User Mapper', () => {
  test('should map user to user entity', () => {
    const input = {
      id: 'id_test',
      name: 'name',
      email: 'email@email.com',
      roles: ['roles', 'roles'],
      password: 'Password1!',
      img: 'img',
    }

    const expected = new UserEntity(
      input.id,
      input.name,
      input.email,
      input.roles,
      input.password,
      undefined,
      undefined,
      input.img,
      undefined,
      undefined,
    )

    const result = UserMapper.userEntityFromObject(input)

    expect(result).toEqual(expected)
  })
})
