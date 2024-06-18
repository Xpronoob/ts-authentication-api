# Authentication API using clean architecture

## Description

User system and JWT Authentication

## Stack / Framework used

Built with:

- [Typescript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [Prisma](https://www.prisma.io/)
- [JWT](https://jwt.io/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Docker](https://www.docker.com/)

## Configs

Configurations & third party packages

## Data

References from databases

## Domain

Business Rules
Datasources: Business Rules to get data
Repositories: Communication with datasources

## Infrastructure

Datasource implementation: Business Rules to get data
Repository implementation: Communication with datasources

## Presentation

Express server with options: port:number

## Folder structure

    ts-authentication-api/
    ├── build/
    ├── src/
    │   ├── config/
    │   ├── domain/
    │   │   │── datasources
    │   │   │── dtos
    │   │   │── entities
    │   │   │── errors
    │   │   └── repositories
    │   ├── infrastructure/
    │   ├── presentation/
    │   │   │── auth
    │   │   └── server.ts
    │   └── app.ts
    ├── http.http
    ├── package.json
    └── tsconfig.json

## Implementations

- [ ] Implement JWT Token
- [ ] Implement Refresh Token
- [ ] Implement Prisma ORM
- [ ] Implement Testing
- [ ] Implement Swagger
- [ ] Implement Docker
- [ ] Implement CI/CD

## Todo Authentication

- [ ] Register
- [ ] Login
- [ ] Logout
- [ ] Profile
- [ ] EditProfile
- [ ] Reset Password

## Todo Users

- [ ] Create User
- [ ] Read User
- [ ] Update User
- [ ] Delete User

## License

## Instalation

Run docker

    docker compose up -d