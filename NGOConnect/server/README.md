# NGOConnect Server Documentation

## Overview
NGOConnect is a MERN stack web application designed to connect NGOs with volunteers and provide an admin panel for managing users and approvals. This server-side application is built using Node.js, Express, and MongoDB.

## Features
- User roles: NGO, Volunteer, Admin
- JWT-based authentication
- Role-based access control
- Event management for NGOs and volunteers
- Admin panel for managing NGO applications

## Folder Structure
```
server/
├── controllers/          # Contains controller files for handling requests
│   ├── adminController.js
│   ├── authController.js
│   ├── eventController.js
│   └── userController.js
├── middleware/           # Contains middleware for authentication and role management
│   ├── auth.js
│   └── role.js
├── models/               # Contains Mongoose models for User and Event
│   ├── Event.js
│   └── User.js
├── routes/               # Contains route definitions for the API
│   ├── admin.js
│   ├── auth.js
│   ├── event.js
│   └── user.js
├── .env                  # Environment variables (MongoDB URI, JWT secret)
├── .gitignore            # Files and directories to ignore in Git
├── package.json          # Project metadata and dependencies
├── README.md             # Documentation for the server
└── server.js             # Entry point of the application
```

## Setup Instructions
1. Clone the repository:
   ```
   git clone <repository-url>
   cd NGOConnect/server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the `server/` directory and add the following environment variables:
   ```
   MONGODB_URI=<your_mongodb_uri>
   JWT_SECRET=<your_jwt_secret>
   ```

4. Start the server:
   ```
   npm start
   ```

5. The server will run on `http://localhost:5000`.

## API Endpoints
### Authentication
- **POST /signup**: Register a new user (NGO, Volunteer, Admin)
- **POST /login**: Authenticate a user and return a JWT

### NGO Routes
- **POST /events**: Create a new event (NGO only)
- **GET /events**: View all events (NGO only)

### Volunteer Routes
- **GET /events**: View all events (Volunteer)
- **POST /events/register**: Register for an event (Volunteer)

### Admin Routes
- **GET /admin/pending**: View pending NGO applications (Admin)
- **POST /admin/approve/:id**: Approve an NGO application (Admin)
- **POST /admin/reject/:id**: Reject an NGO application (Admin)

## Middleware
- **auth.js**: Protects routes using JWT authentication.
- **role.js**: Ensures users have the appropriate role to access certain routes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.