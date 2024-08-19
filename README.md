# Authentication API using clean architecture

## Description

Users system and JWT Authentication build on clean architecture

## Stack / Framework used

Built with:

- [Typescript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [Mongo](https://mongodb.com/)
- [JWT](https://jwt.io/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Docker](https://www.docker.com/)

## Config

Configurations, Adapters & Third party packages

## Data

References, Models from databases

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
    │   │   │── admin
    │   │   │── auth
    │   │   │── middlewares
    │   │   └── server.ts
    │   └── app.ts
    ├── docker-compose.yml
    ├── package.json
    └── tsconfig.json

## Token Implementations

- [x] Implement JWT Generate Token
- [x] Implement JWT Validate Token
- [x] Implement JWT Refresh Token

## Others

- [ ] Implement Testing
- [ ] Implement Swagger
- [ ] Implement Docker
- [ ] Implement CI/CD

## Authentication

- [x] Register
- [x] Login
- [x] Logout
- [x] Profile
- [ ] EditProfile
- [ ] Reset Password

## Admin Users

- [x] Create User
- [x] Find User
- [x] Find All User
- [x] Update User
- [x] Delete User

## License

## Installation

Run docker

    docker compose up -

Run development environment

    pnpm run dev
