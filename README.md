![Node.js CI](https://github.com/HCAATPI/gcp-ati-hdo-api.git/workflows/Node.js%20CI/badge.svg?branch=master)

# HCA Day of Assignments API App

This project contains the backend API and business logic to perform DoA.

[![Run on Google Cloud](https://deploy.cloud.run/button.svg)](https://deploy.cloud.run?git_repo=https://github.com/HCAATPI/gcp-ati-hdo-api.git)

## Features

1. ES6+ features with babel (including **es6 import/export** feature).
2. SQL database implementation with **[Sequelize v6](https://sequelize.org/docs/v6/)** for **postgres dialect**
3. Compatible with [12 factor app](https://12factor.net/).
4. Including authentication system with rest api endpoints.
5. Linting with eslint (airbnb config).
6. Docker container on node:20-alpine.
7. Test cases written with mocha and chai.
8. Employs [sentry](https://sentry.io) error tracking.
9. Api documentation with [swagger](https://swagger.io/).
10. Cache management with [redis](https://redis.io/).
11. One click deploy to [Google Cloud Run](https://cloud.google.com/run) for dev.

## Api Documentation

Api documentation of this project was created with [swagger](https://swagger.io/).  
You can access the documentation by going to `/docs` when you run the application.

## Database

This project is compatible with sql-based databases. You can change default dialect (postgres) in anytime.
To do this, firstly select your database from the table below.
Modify `dialect` property in `src/config/sequelize.js` and install required npm package(s) for this database.

For more info, visit [sequelize docs](https://sequelize.org/docs/v6/other-topics/dialect-specific-things/)

**Note:** The default and active database is postgresql.
If you want to use postgresql in your project, you don't need to make any changes.

| Database             | Dialect  | Required npm Package(s) |
| -------------------- | -------- | ----------------------- |
| MySQL                | mysql    | `yarn add mysql2`       |
| MariaDB              | mariadb  | `yarn add mariadb`      |
| PostgreSQL           | postgres | `yarn add pg pg-hstore` |
| SQLite               | sqlite   | `yarn add sqlite3`      |
| Microsoft SQL Server | mssql    | `yarn add tedious`      |

### Usage of sequelize-cli

With sequelize-cli package, you can manage model, migration and seed files.
You can find more information with [document](https://sequelize.org/docs/v6/other-topics/migrations/).

## Installation

1. Firstly, you have to install npm packages with `yarn install` command.
2. Ensure postgres database server and redis server are up and running.
3. Create empty postgres database.
4. Create **.env** file by copying _.env.sample_ file in **root directory**.
5. Modify .env file with credentials.
6. Use `yarn run db:migrate` to create database tables.
7. Finally, your app will run successfully with `yarn run start:dev` command.

## Authentication Endpoints

For using any HCA API you need to provide the token. The token is generated and provided to the API by UI backend.
Inorder to run tests, a dev endpoint that can mimick the same functionality is required.
The auth endpoint mimicks that functionality. During development, invoke /auth/authorize to authorize a user and /auth/token to receive the token.
Use the token to access the other APIs.

| Route           | HTTP Verb | Request Body                                                                                    | Description                  |
| --------------- | --------- | ----------------------------------------------------------------------------------------------- | ---------------------------- |
| /auth/authorize | `POST`    | {"firstName": "John", "lastName": "Doe", "email": "john.doe@example.com", "password": "123456"} | End point for standalone dev |
| /auth/token     | `POST`    | {"email": "john.doe@example.com", "password": "123456"}                                         | End point for standalone dev |

## License

**HCAATPI** is licensed under the **MIT license**.
