# Home Library Service


## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker](https://www.docker.com/).

## Downloading

```
git clone https://github.com/agreenwalrus/nodejs2022Q4-service
```

## Check out the branch

```
git checkout postgres
```

## Installing NPM modules

```
npm install --legacy-peer-deps
```

## Run Postgres with Docker

```
docker compose -f "docker-compose.yml" up -d --build 
```

## Initialize DB

```
npx prisma migrate dev --name init
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Stop Postgres with Docker

```
docker compose -f "docker-compose.yml" down
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```