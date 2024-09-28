import { describe, expect, test } from '@jest/globals'
import { CreateUserDto } from '../../../src/domain/dtos'

describe('Create User DTO', () => {
  test('should map user to CreateUserDto', () => {
    const input = {
      name: 'name',
      email: 'email@email.com',
      roles: ['roles', 'roles'],
      password: 'Password1!',
    }

    const [error, result] = CreateUserDto.create(input)

    expect(error).toBeUndefined()

    const expected = {
      name: input.name,
      email: input.email.toLowerCase(),
      password: input.password,
      roles: input.roles,
      img: undefined,
      lastname: undefined,
      phone: undefined,
      address: undefined,
    }

    expect(result).toEqual(expected)
  })
})
