Employee Task Management API

A REST API built with Node.js, Express.js, MySQL, mysql2, dotenv, and express-validator. It manages employees and their tasks, validates task assignments, updates task status, and provides workload/reporting endpoints.

Requirements

- Node.js (LTS recommended)
- npm
- MySQL Server
- Postman (optional, for testing the endpoints)

1. Install dependencies
   Clone or extract the project, open a terminal in the project directory, and run:
   npm install

2. Create the database
   Open MySQL Workbench, DBeaver, or a MySQL terminal and run:
   CREATE DATABASE employee_management;
   Select the database and execute the SQL in schema.sql to create the employees and tasks tables:
   USE employee_management;
   Then execute the contents of schema.sql

3. Configure environment variables
   Copy .env.example to .env:
   Edit .env with the credentials for your local MySQL instance.

4. Start the API
   For development with automatic restarts:
   npm run dev
   For a normal start:
   npm start
   The default example URL is http://localhost:3000. Visit GET http://localhost:3000/ to check whether the server is running; it should respond with Server running.

Authentication
The following endpoints require this header:
Authorization: Bearer test-token

Protected endpoints:

- POST /api/employees
- POST /api/tasks
- PATCH /api/tasks/:id/status

The GET endpoints are public for this machine test.
