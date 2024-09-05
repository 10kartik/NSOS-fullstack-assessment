# NSOS-fullstack-assessment

<b>nSquareOffshore assessment solution</b> - .dbml, OpenAPI Specs, node.js, Express, MongoDB, React, Redux.

<b> Database schema and collections: </b>

[![DB Schema](./backend/docs/db-schema.png)](https://github.com/10kartik/NSOS-fullstack-assessment/blob/master/backend/docs/schema.dbml)

<b> API Endpoints: </b>

[![OpenAPI Specifications](./backend/docs/API-spec.png)](https://github.com/10kartik/NSOS-fullstack-assessment/blob/master/backend/docs/openAPI.yaml)

<b> Steps to run the project: </b>

1. Setup backend

- cd backend
- npm install
- set environment variables in .env file,
  ```
  ENVIRONMENT=development
  DB_SUFFIX=dev
  APP_NAME=products-api
  PORT=3000
  MONGODB_CONNECTION_STRING=
  ```
- npm start dev

2. Setup frontend

- cd frontend
- npm install
- set environment variables in .env file
  ```
  REACT_APP_API_DOMAIN=http://localhost:8080
  ```
- npm start dev
