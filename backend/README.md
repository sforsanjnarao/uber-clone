# API Endpoints

- [POST /api/users/register]

## POST /api/users/register

### Overview

This endpoint handles the registration of new users. It takes user details, validates them, hashes the password, creates a user in the database, and returns a JWT for authentication.

### API Endpoint

- **Method:** `POST`
- **Endpoint:** `/api/users/register`

- **Request Body (JSON):**

  ```json
  {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "securePassword123"
  }
  ```

- **Success Response (JSON - 201 Created):**

  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "_id": "64d0f384b8f9b3b542e8a3b5",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "__v": 0
    }
  }
  ```

- **Error Response (JSON - 400 Bad Request):**

  ```json
  {
    "errors": [
      {
        "msg": "Invalid email",
        "param": "email",
        "location": "body"
      },
      {
        "value": "",
        "msg": "must be at least 3 characters long",
        "param": "fullname.firstname",
        "location": "body"
      },
      {
        "value": "",
        "msg": "Password must be at least 8 characters",
        "param": "password",
        "location": "body"
      }
    ]
  }
  ```

- **Error Response (JSON - 500 Internal Server Error):**
  This type error may be result of database connection

### Components and Methods

- **`user.routers.js`:** Defines the `/register` route and applies validation middleware.

  - `router.post('/register', ...)`: Handles POST requests, validates input, and calls the controller.

- **`user.controller.js`:** Handles the registration logic.

  - `registerUser(req, res, next)`: Validates request, hashes password, creates user, generates token, and sends response.

- **`user.model.js`:** Defines the User schema and related methods.

  - `generateAuthToken()`: Generates a JWT for the user.
  - `comparePassword(password)`: Compares a given password with the stored hashed password.
  - `statics.hashpassword(password)`: Hashes a given password.

- **`user.service.js`:** Provides the service layer for user creation.
  - `createUser(...)`: Creates a new user in the database.

### Flowchart

```mermaid
 graph TD
    A[Client: POST /register with user data] --> B{Validation in user.routers.js};
    B -- Invalid: Missing or incorrect data --> E[Response: 400 Bad Request with error details];
    B -- Valid --> C[user.controller.js: registerUser];
    C --> D[Hash Password (user.model.js: hashpassword)];
    D --> F[Create User in DB (user.service.js: createUser)];
    F -- Success --> G[Generate JWT (user.model.js: generateAuthToken)];
    F -- Database Error --> J[Response: 500 Internal Server Error];
     G --> H[Prepare Response (user.controller.js)];
    H --> I[Response: 201 Created with token and user data];
    C -- Other Errors --> J;
```
