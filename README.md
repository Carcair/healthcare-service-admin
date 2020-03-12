# Health care service Application

## About

Application for health care services. It consists from Administration service and Client service.

#### Admin service
Admin service will have REST api with CRUD operations for employees and teams. Teams can have many or none employees and employee can be in more or none teams.
There must be routes for:
* creating and deleting teams,
* creating and deleting employees,
* attaching and detaching an employee to/from a team.

#### Client service
Client service has a REST api endpoint for listing all teams.

## Technology requirements

Tech requirements (use one of following)
* Language: Java/PHP/NodeJS/golang
* Administration Storage: MySQL, PostgreSQL
* Client Storage: Redis
* Messaging: RabbitMQ, Kafka
* Docker and Docker Compose for Storage and Messaging tools.

## Setup

Using 

$ cd "path/backend-task"
$ npm install

$ npm run dev

or

$ npm run start

For development we use nodemon with:
> npm run dev

For deployment it's necessary for script command start:
> npm run start