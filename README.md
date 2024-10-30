## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Architecture

The backend is structured as a service-oriented application, making it easy to extend and maintain.

### Overview

| Component    | Technology         | Description                                        |
|--------------|--------------------|----------------------------------------------------|
| **Framework**| NestJS             | Backend framework for building scalable APIs       |
| **Database** | MongoDB            | Data storage for HTTP response records             |
| **CORS**     | NestJS Middleware  | Allows requests from authorized frontends          |

### Data Flow

1. **HTTP Response Collection**: The backend exposes endpoints to log and retrieve HTTP responses. <br/> 
2. **Polling Mechanism**: The frontend can call the `/ping/history` endpoint every few seconds yse SOCKET IO to fetch new response data. <br/> 
3. **Data Management**: MongoDB stores each response with headers, payload, status, and other metadata. <br/> 

### Directory Structure

<p> 
"src" - the main source code directory, containing various modules and files. <br/> 
"test" - directory for test-related files. <br/> 
</p>

<p> 
Inside the "src" directory, there are several subdirectories:  <br/> <br/>   
"common" - likely contains shared utility functions, constants, or base classes.  <br/>  
"database" - files related to the database integration, such as the DAO (Data Access Object). <br/>  
"utils" - additional utility files.  <br/>  
"config" - configuration-related files.  <br/>  
"modules/ping" - files related to the "ping" functionality, such as controllers, services, and specifications.  <br/>  
"schemas" - files defining the application's data models or schemas. <br/> 
</p>


### Choice of technologies and reasoning

<p> The key design choices and reasoning behind this structure include: </p> <br/> 
<p>  NestJS is a popular Node.js framework that is well-suited for building scalable and efficient backend applications. It provides a modular and opinionated structure that aligns with the directory layout you've shown. </p> <br/> 
<p> Modularity: The project is organized into distinct modules, such as "ping", "database", and "config". This modular approach promotes code reusability, maintainability, and separation of concerns. </p> 
<p> Separation of Concerns: The separation of files into directories like "common", "utils", and "schemas" suggests a clear separation of different types of functionality, making the codebase more organized and easier to navigate. </p> 
<p> TypeScript: The extensive use of TypeScript files (.ts) indicates that this project is taking advantage of TypeScript's static typing, which can improve code quality, maintainability, and developer productivity. </p> 
<p> Testing: The presence of ".spec.ts" files suggests that the project includes a well-established testing framework, likely using a tool like Jest or Jasmine, to ensure the reliability and correctness of the codebase. </p> 
<p> Configuration Management: The "config" directory indicates that the project has a dedicated place to store and manage various configuration settings, such as database connections, environment-specific variables, and other application-wide configurations. </p> 
<p> Dependency Management: The "node_modules" directory is where the project's dependencies, including NestJS and any other third-party libraries, are installed and managed, likely using a package manager like npm or yarn.</p> 

