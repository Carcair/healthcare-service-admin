# Health care service Application

## About

Application for health care services. It consists from Administration service and Client service (pushed on https://github.com/Carcair/healthcare-service-user).

#### Admin service
Admin service will have REST api with endpoints for CRUD operations for employees and teams. Teams can have many or none employees and employee can be in more or none teams.
There must be routes for:
* creating and deleting teams,
* creating and deleting employees,
* attaching and detaching an employee to/from a team.

#### Client service
Client service has a REST api endpoint for listing all teams.

## Technology requirements

Tech requirements (use one of following)
* Language: Java/PHP/NodeJS/golang
* Administration storage: MySQL, PostgreSQL
* Client storage: Redis
* Messaging: RabbitMQ, Kafka
* Docker and Docker Compose for storage and messaging tools.

Used:
* Language: NodeJS,
* Administration storage: MySQL,
* Client storage: MongoDB (NoSQL) instead of Redis,
* Messaging: RabbitMQ,
* Docker not used, not enough memory to use it on available PC.

## Setup

Install: 

```
$ npm install
```

Run:
```
$ npm run dev
```

or:

```
$ npm run start
```

RabbitMQ server is at default "amqp://localhost:5672". Necessary to install it or to use Docker image, get started at "https://www.rabbitmq.com/download.html".

For development we use nodemon with:
> npm run dev

For production build it's necessary for script command start:
> npm run start

Run locally at port:
* http://localhost:5000

Endpoints:
* /api/employees , for employee info
* /api/teams , for team info
* /api/teammembers , for teams with members

Use Postman to test CRUD operations ( https://www.postman.com/ ).

## Additional info

UI not included. Will add it if necessary.

API's are not hosted, start LOCALLY. Start BOTH API's to fully explore their application.