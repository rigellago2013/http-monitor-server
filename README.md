## Project setup

```bash
$ git clone https://github.com/rigellago2013/http-monitor-server.git
$ npm install

** Please see other instructions below on how to run on local
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
$ npm run test -- --coverage 
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
2. **Polling Mechanism**: The frontend can call the `/ping/history` endpoint every second to fetch new response data to mimic realtime udpate since vercel FREE tier does not support socket io.
3. **Data Management**: MongoDB stores each response with headers, payload, status, and other metadata. <br/> 

### Directory Structure

<p> 
"src" - the main source code directory, containing various modules and files. <br/> 
"test" - directory for test-related files. <br/> 
</p>

<p> 
Inside the "src" directory, there are several subdirectories:  <br/> <br/>   
"common" -  contains shared utility functions, constants, or base classes.  <br/>  
"database" - files related to the database integration, such as the DAO (Data Access Object). <br/>  
"utils" - additional utility files such as constants.  <br/>  
"config" - configuration-related files such as CORS.  <br/>  
"modules/ping" - files related to the "ping" functionality, such as controllers, services, specifications and tests.  <br/>  
"schemas" - files defining the application's data models or schemas. <br/> 
</p>


### Choice of technologies and reasoning

<p> The key design choices and reasoning behind this structure include: </p> <br/> 
<p> NestJS is a popular Node.js framework that is well-suited for building scalable and efficient backend applications. It provides a modular and opinionated structure that aligns with the directory layout you've shown. </p> <br/> 
<p> Modularity: The project is organized into distinct modules, such as "ping", "database", and "config". This modular approach promotes code reusability, maintainability, and separation of concerns. </p> 
<p> Separation of Concerns: The separation of files into directories like "common", "utils", and "schemas" suggests a clear separation of different types of functionality, making the codebase more organized and easier to navigate. </p> 
<p> TypeScript: The extensive use of TypeScript files (.ts) indicates that this project is taking advantage of TypeScript's static typing, which can improve code quality, maintainability, and developer productivity. </p> 
<p> Testing: The presence of ".spec.ts" files suggests that the project includes a well-established testing framework, likely using a tool like Jest or Jasmine, to ensure the reliability and correctness of the codebase. </p> 
<p> Configuration Management: The "config" directory indicates that the project has a dedicated place to store and manage various configuration settings, such as database connections, environment-specific variables, and other application-wide configurations. </p> 
<p> Dependency Management: The "node_modules" directory is where the project's dependencies, including NestJS and any other third-party libraries, are installed and managed, likely using a package manager like npm or yarn.</p> 

### Assumptions Made

<p> Resource Limitations on Hosting: <p>

<p> Hosting Constraints: The hosting environment may have restrictions on real-time data handling since I use FREE, such as limited WebSocket connections or CPU and memory resources. These limitations can hinder the performance of applications that rely heavily on real-time data. </p> 
<p> Data Consumption Challenges: Given that the frontend cannot consume broadcasted data directly from the backend, alternative methods for data retrieval must be considered. For instance, frequent polling from front end could be implemented to periodically fetch data from the backend instead of relying on a push mechanism.  </p>

### Future improvements

<p> Pagination, where more items are automatically loaded as the user clicks the pagination buttons, this can provide a more fluid experience, especially for content-heavy applications. </p> 
<p> Search and Filter Integration: Combine pagination with search and filter functionality to allow users to narrow down results and navigate through a smaller, more relevant dataset.  </p> 
<p> Websockets for realtime data fetching that uses less memory usage.   </p> 


### Testing strategy and core component identification
<p> <strong> Core components </strong> can be found on 'src/module/ping' which includes DAO, DTO, Service and Testing (ping.service.spec.ts) which contains main functionalities of the backend that includes ping to httpbin.org, saving pinged data, and pulling historical data. </p>

### How to run project on your local
```bash
#run
$ git clone https://github.com/rigellago2013/http-monitor-server.git
$ npm install
```
<strong> Important </strong>
<p> Change constant variable CLIENT_ORIGIN on `src\common\utils\constants.ts` to 'http://localhost:8080' so that CORS will not block frontend request </p>

```bash
#run
$ npm run start:dev
```

### Database Schema

```bash
// src/schemas/response.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ResponseDocument = HydratedDocument<Response>;

@Schema()
export class Response {
  @Prop({ type: Object })
  args: Record<string, any>;

  @Prop({ type: String })
  data: string;

  @Prop({ type: Object })
  files: Record<string, any>;

  @Prop({ type: Object })
  form: Record<string, any>;

  @Prop({ type: Object })
  headers: Record<string, string>;

  @Prop({ type: Object, default: null })
  json: any;

  @Prop({ type: String })
  method: string;

  @Prop({ type: String })
  origin: string;

  @Prop({ type: String })
  url: string;
}

export const ResponseSchema = SchemaFactory.createForClass(Response);

```
