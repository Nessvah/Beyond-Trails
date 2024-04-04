# Backend - NodeJS / Express

## Collaborating using Git

! First of all - Create a new branch and work outside main branch.
In that case if something goes wrong the part of our app that it's working correctly will not be affected.

### Workflow

```
Start a new feature
git checkout -b new-feature // This will create a new branch and move into it

# Edit some files
git add <file>
git commit -m "Start a feature"

# Edit some files
git add <file>
git commit -m "Finish a feature"

# Go back to the main branch
git checkout main

# Ensure that the main branch is up-to-date with the latest remote changes
git fetch
git pull

# Merge in the new-feature branch
git merge new-feature

# Now you can push your changes to the remote
git push

```

## Things to do (there's more, but you can start from some of these)

- [ ] it's very important to handle potential errors that might occur, since we don't want our server to crash.
      Try to implement Try, Catches where it seems fit.
- [ ] defining the endpoints that we are going to need for our app (e.g.: /services/hotelaria/:id - to get one specific place from hotelaria category)

> Try to name your variables accordingly and comment your code as much as possible so that we can all understand what's going on. 😊

## REST API DOCS

### Response structure

#### Success response example:

JSON {
      status: "success",
      message: "user created successfully",
      data: (user obj)
      }


## Packages

### Production dependencies

- [x] express
- [ ] multer - file upload
- [ ] bcryptejs - encrypting passwords
- [ ] morgan or winston - logging
- [ ] jsonwebtoken - Authentication/Authorization
- [x] mongoose or prisma - Data schemas
- [ ] cors - allows restricted resources on the web page to be requested from another server.
- [x] dot-env - .env.json file to merge into your process.env runtime variables
- [ ] express-validator - can validate and sanitize your express requests, and offers tools to determine if the 
- request is valid or not, which data was matched according to your validators, and so on.
- [x] nodemailer or sendgrid - for sending email/newsletter
- [ ] cron - for scheduling tasks (sending newsletter every week)
- [x] joi - schema description language and data validator for JavaScript.

### Development dependencies

- [x] Nodemon

### Testing

- [ ] Jest

## Project File/Folder Structure

In our MERN (MongoDB, Express, React, Node.js) project, we are using a specific file and folder structure to organize our code more effectively. Each folder serves a specific purpose, making our project easier to maintain, scalable, and collaborative.

### Folders

#### Controllers:

The controllers folder contains JavaScript files that handle the business logic and data processing for different entities or features of our application.
They are responsible for receiving data from the routes, interacting with the database through models, performing necessary operations, and sending back the appropriate response.

#### Middleware:

The middleware folder contains JavaScript files that define middleware functions used to intercept and process HTTP requests before they reach the route handlers.

These functions can perform tasks such as authentication, data validation, logging, error handling, and other common operations shared across multiple routes.

#### Utils:

The utils folder contains custom utility functions or helper modules that provide reusable functionality throughout the application.

These offer a collection of commonly used functions that are not tied to specific controllers or routes, enhancing code reusability and promoting a DRY (Don't Repeat Yourself) coding approach.

#### Models:

The models folder contains JavaScript files defining data models that represent the structure and behavior of your application's data stored in the database (MongoDB)

Models help encapsulate data handling, validation, and interactions with the database, ensuring data consistency and providing an abstraction layer between the application and the database.

#### Routes:

The routes folder contains JavaScript files that define the API routes and their corresponding HTTP methods (GET, POST, PUT, DELETE, etc.).

In this folder we handle incoming HTTP requests and route them to the appropriate controller functions. Here we define the API endpoints through which clients can interact with our application.

> By following this folder structure, we ensure a clean, modular, and maintainable codebase. It helps us collaborate effectively as a team, understand each component's responsibilities, and scale our application smoothly as it evolves over time. This organized structure is a best practice in MERN projects and sets the foundation for building a robust and successful application.
