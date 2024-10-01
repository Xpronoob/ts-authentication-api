# Authentication API using clean architecture

## Description

Users with roles system and JWT Authentication build on clean architecture

## Stack / Framework used

Built with:

[Typescript](https://www.typescriptlang.org/) | [Node.js](https://nodejs.org/en/) | [Express.js](https://expressjs.com/) | [Mongo](https://mongodb.com/) | [JWT](https://jwt.io/) | [Bcrypt](https://www.npmjs.com/package/bcrypt) | [Docker](https://www.docker.com/) | [Jest](https://jestjs.io/)

## Folder structure

    ts-authentication-api/
    ├── __test__/
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
    │   │   │── admin
    │   │   │── auth
    │   │   │── middlewares
    │   │   └── server.ts
    │   └── app.ts
    ├── .env
    ├── docker-compose.yml
    ├── package.json
    └── tsconfig.json

## Token Implementations

- [x] Implement JWT Generate Token
- [x] Implement JWT Validate Token
- [x] Implement JWT Refresh Token

## Authentication

- [x] Register
- [x] Login
- [x] Logout
- [ ] Profile
- [ ] EditProfile
- [ ] Reset Password

## Admin Users

- [x] Create User
- [x] Find All Users
- [x] Find User by Id
- [x] Update User
- [x] Delete User

## License

## Installation

Run docker

    docker compose up -

Configure environment variables .env file

    # Configuration
    FRONTEND_URL=
    PORT=3030
    DEBUG_MODE=

    # Database
    MONGO_URL=
    MONGO_DB_NAME=

    # JWT Private Key
    JWT_ACCESS_TOKEN=
    JWT_REFRESH_TOKEN=

    # Cookies expiration time
    # Time units: s, m, h, d
    COOKIE_EXPIRES_ACCESS_TOKEN=5s
    COOKIE_EXPIRES_REFRESH_TOKEN=120d

Run development environment

    pnpm run dev
