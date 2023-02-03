# lackofwater-back

Back-end for Lack Of Water RPG, a text based game.

## About

Lack of Water is a text based RPG, it's on initial stages of development and hopefully more content will be added in the near future.

## How to run for development

1. Clone this repository
2. Install all dependencies

```bash
npm i
```

3. Create a PostgreSQL database with whatever name you want
4. Configure the `.env.development` file using the `.env.example` file as example
5. Run all migrations

```bash
npm run migration:run
```

6. Seed db

```bash
npm run dev:seed
```

6. Run the back-end in a development environment:

```bash
npm run dev
```

## How to run tests

1. Follow the steps in the last section
1. Configure the `.env.test` file using the `.env.example` file as example
1. Run all migrations

```bash
npm run migration:run
```

3. Run test:
   (locally)

```bash
npm run test
```

## Building and starting for production

```bash
npm run build
npm start
```

## Running migrations or generate prisma clients

Before running migrations make sure you have a postgres db running based on `.env.development` or `.env.test` file for each environment. You can operate on databases for different environments, but it is necessary to populate correct env variables for each environment first, so in order to perform db operations type the following commands:

- `npm run dev:migration:run` - run migrations for development environment by loading envs from .env.development file. It uses [dotenv-cli](https://github.com/entropitor/dotenv-cli#readme) to load envs from .env.development file.
- `npm run test:migration:run` - the same, but for test environment

- `npm run dev:migration:generate` - generate and run migration and prisma client for development environment by loading envs from .env.development file.

## Running application locally

`.env.development` and `.env.test` must be changed if you and to run the application locally. You can populate files based on `.env.example` file, but you need to consider the following:

- Running application locally (postgres and node):

Add your postgres credentials and make sure to create given database before running the application.
