export class FindByUserDto {
  private constructor(
    public id: string,
    public name?: string,
    public email?: string,
    public password?: string,
    public roles?: string[],
    public img?: string,
  ) {}

  static create(criteria: { [key: string]: any }): [string?, FindByUserDto?] {
    const { id, name, email } = criteria
    if (!name && !email && !id) return ['Missing search']

    return [undefined, new FindByUserDto(id, name, email)]
  }
}