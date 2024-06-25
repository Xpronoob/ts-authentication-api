# Authentication API using clean architecture

## Description

User system and JWT Authentication with clean architecture

## Stack / Framework used

Built with:

- [Typescript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
<!-- - [Prisma](https://www.prisma.io/) -->
- [Mongo](https://mongodb.com/)
- [JWT](https://jwt.io/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Docker](https://www.docker.com/)

## Configs

Configurations, Adapters & Third party packages

## Data

References from databases

## Domain

Enterprise Business Rules

## Infrastructure

Application Business Rules

## Presentation

Frameworks & Drivers

## Folder structure

    ts-authentication-api/
    ├── build/
    ├── src/
    │   ├── config/
    │   ├── data/
    │   ├── domain/
    │   │   │── datasources
    │   │   │── dtos
    │   │   │── entities
    │   │   │── errors
    │   │   │── repositories
    │   │   └── use-cases
    │   ├── infrastructure/
    │   │   │── datasources
    │   │   │── mappers
    │   │   └── repositories
    │   ├── presentation/
    │   │   │── auth
    │   │   │── middlewares
    │   │   └── server.ts
    │   └── app.ts
    ├── http.http
    ├── docker-compose.yml
    ├── package.json
    └── tsconfig.json

## Implementations

- [x] Implement JWT Token
- [ ] Implement Refresh Token
<!-- - [ ] Implement Prisma ORM -->
- [ ] Implement Testing
- [ ] Implement Swagger
- [ ] Implement Docker
- [ ] Implement CI/CD

## Todo Authentication

- [x] Register
- [x] Login
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