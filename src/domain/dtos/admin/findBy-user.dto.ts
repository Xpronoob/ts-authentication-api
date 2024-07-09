export class FindByUserDto {
  private constructor(
    public name: string,
    public email: string,
  ) {}

  static create(object: { [key: string]: any }): [string?, FindByUserDto?] {
    const { name, email } = object
    if (!name && !email) return ['Missing search']

    return [undefined, new FindByUserDto(name, email)]
  }
}
