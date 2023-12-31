# Calendar Scheduler

This is a NestJS project for managing events and retrieving calendar information.

## Prerequisites

Before you start, make sure you have Node.js, npm, and PostgreSQL installed on your machine.

## Cloning the Project

1. Open the terminal.
2. Navigate to the directory where you want to clone the project.
3. Run the following command:

```bash
git clone https://github.com/m4dBuda/calendar-scheduler-api.git
```

## Setting Up the Project

1. Navigate to the project directory:


```bash
cd <dir name>
```


2. Install the project dependencies:


```bash
npm install
```
## Configuring the Database

This project uses PostgreSQL as its database. Make sure PostgreSQL is installed and running on your machine.

1. Update the `.env` file at the root of the project with your database information.
2. Create a new database in PostgreSQL. You can do it manually or use prisma migrate command to do it for you based on prisma.schema.


Example of `.env` file:

```bash
DATABASE_URL=`${DB_DIALECT}://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`

DB_DIALECT=postgresql
DB_HOST=localhost
DB_USERNAME=postgres
DB_PASSWORD=password
DB_DATABASE=calendar-db
DB_PORT=5432
```

Replace the `.env` variables with their respective values within your PostgreSQL server.

## Prisma

This project uses Prisma as its ORM. To generate the database schema, run the following command:

```bash
npx prisma db push --preview-feature
```

This command will create the database schema based on the `schema.prisma` file in the `prisma` folder.

To start a web database UI and intect with the database you can also run the following command:

```bash
npx prisma studio
```
This command will start a web server with your database in http://localhost:5555/


## Running the Project

To run the project, use the following command:

```bash
nest start --watch
```


The server should start running on port 3000.

## Running tests

To run the project unit tests, use the following command:

```bash
npm run test
```

## Accessing the API Documentation

The API documentation is available at the `/docs` route. To access it, open a browser and go to `http://localhost:3000/docs`.

## Making Calls to the API

You can use any HTTP client to make calls to the API. The available routes and methods are documented in the API documentation.

# Roadmap, Development and Optimizing
In the upcoming steps, we have several goals to improve and optimize our application:

### Containerization
We aim to containerize the application to ensure that it runs consistently across different computing environments.

### User Management System
We plan to implement a user management system using JWT (JSON Web Tokens). The JWT validators will ensure that the JWT received can only interact with events that belong to the user ID that generated the current JWT request.

### GitHub Actions
We will enable GitHub Actions to run unit tests on the main branch, ensuring that all changes are thoroughly tested before they are merged.

### Database and Application Deployment
We plan to host our database on Amazon RDS (Relational Database Service) and deploy our application on an EC2 instance in AWS (Amazon Web Services). This will provide us with scalable, reliable, and secure computing resources.

### Mobile Application Development
We plan to develop a mobile application using Flutter. This app will serve as a calendar management platform, featuring an intuitive interface where events are grouped by date. Users can select a date to view their scheduled events for that day. This approach ensures a seamless and consistent user experience across both web and mobile platforms.

### Notification Service
We plan to implement a notification service to alert users about their scheduled events. Users will have the option to opt out of these notifications. This will likely be implemented as a boolean column in the events table, such as notify_user.

### Author

- [João Otávio Carvalho Castejon](https://github.com/m4dBuda)
