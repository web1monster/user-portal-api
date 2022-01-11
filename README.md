# User Portal API

[![codecov](https://codecov.io/gh/webcat12345/user-portal-api/branch/master/graph/badge.svg?token=EYJYRJVGLN)](https://codecov.io/gh/webcat12345/user-portal-api)

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Description

This project was created by [Nest](https://github.com/nestjs/nest) and deployed to the Heroku for the hosting service

## Technical specifications

* This project will run on `node.js` environment.
* Postgresql is used for the database, database should exist.
* `.env.example` has environment values, mainly `DATABASE_URL` should be defined based on your Postgresql configuration.
* Create a `.env` manually and populate required values.
* Example database url is `DATABASE_URL = postgres://root:root@localhost:5432/user_portal`. Further details can be found [here](https://github.com/brianc/node-postgres/tree/master/packages/pg-connection-string).
* There is a seed service which will populate database with startup data.

## About project configure

* Hosted on Github, and CI/CD configured using [Github Actions](https://github.com/features/actions) and [Heroku](https://dashboard.heroku.com/)
* Github action will check code quality, such as lint, unit test for each git push actions
* `master` branch is connected with the Heroku pipeline directly, when CI succeed, code will be automatically pushed to the server
* There is an open api document, swagger - https://user-portal-api-v1.herokuapp.com/doc/
* Code coverage doesn't include entities, dtos, consts, only applies to services, controllers and util functions.

## Running on local environment

```bash
$ npm install
$ npm run start # Normal start or...
$ npm run start:dev # Watch mode, means hot reloading for the code change
```

## Running test manually

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
