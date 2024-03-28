# Pioneer Labs Backend Assessment

This repository contains the backend code for the Pioneer Labs Backend Assessment. It implements user authentication with JWT, API endpoints for data retrieval, Swagger documentation, and secure API endpoints for authenticated users only.

## Outputs

### These are the output screenshots

### Test for auth/register 
![Screenshot 2024-03-26 235228](https://github.com/Eswar797/Pioneer-Backend/assets/88208816/7d60e31b-0d4e-40c3-97c8-190caf0f156c)

### Test for auth/login
![Screenshot 2024-03-26 235311](https://github.com/Eswar797/Pioneer-Backend/assets/88208816/b19e9fdb-5f71-4f7d-9fc5-0e0672546451)

### Swagger Docs
![Screenshot 2024-03-26 235340](https://github.com/Eswar797/Pioneer-Backend/assets/88208816/172489d4-b8fb-409b-ae5b-6b4f4a940e76)

![Screenshot 2024-03-26 235408](https://github.com/Eswar797/Pioneer-Backend/assets/88208816/1b611920-a304-45e7-b37e-1415e4b0cf42)

![Screenshot 2024-03-26 235428](https://github.com/Eswar797/Pioneer-Backend/assets/88208816/29e5dc4d-fefa-44c7-92cd-79c4fa10f3cd)

![Screenshot 2024-03-26 235449](https://github.com/Eswar797/Pioneer-Backend/assets/88208816/26508bd3-a7e8-4271-9f04-918831f9e0fa)

![Screenshot 2024-03-26 235544](https://github.com/Eswar797/Pioneer-Backend/assets/88208816/e0154a78-3b01-4ee0-9934-6fc5295889d8)

## Setup

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/Eswar797/Pioneer-Backend/tree/main.git
    ```

2. Navigate to the project directory:

    ```bash
    cd pioneer-backend
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Start the server:

    ```bash
    node index.js
    ```

## Functionality

### Task 1: Implement User Authentication with JWT

#### Approach:

1. **Setup Project**: Initialized a Node.js project and installed necessary packages (`express`, `jsonwebtoken`, `body-parser`, `sqlite3`, etc.).
2. **Database Setup**: Created a SQLite database and designed tables for users including fields like username, email, password, etc.
3. **User Registration**:
    - Created an endpoint `/register`.
    - Accepted user details, validated them, and stored them in the database.
    - Hashed passwords before storing for security.
4. **User Login**:
    - Created an endpoint `/login`.
    - Verified user credentials against the database.
    - If valid, generated a JWT using `jsonwebtoken` and sent it back to the user.
5. **Middleware for JWT Verification**:
    - Created a middleware function that checks the JWT in the request header.
    - Used it in routes that require authentication.
6. **User Logout**: Since JWTs are stateless, logout typically involves the client-side destroying the token.

### Task 2: Create API Endpoints for Data Retrieval

#### Approach:

1. **Setup API Routes**: Created routes for data retrieval.
2. **Fetch Data**: Used Node.js's `axios` module to fetch data from `https://api.publicapis.org/entries`.
3. **Implement Filtering**:
    - Added query parameters for categories and result limits.
    - Filtered the data based on these parameters before sending the response.

### Task 3: Implement Swagger Documentation

#### Approach:

1. **Install Swagger Dependencies**: Installed `swagger-ui-express` and `yamljs` packages.
2. **Write Swagger Documentation**: Created a Swagger document in YAML format describing the API endpoints.
3. **Serve Swagger UI**: Served the Swagger documentation using `swagger-ui-express`.
4. **Document All Endpoints**: Documented all API endpoints including query parameters, body parameters, and headers.
5. **Testing and Validation**: Tested the Swagger UI to ensure all documented endpoints are listed correctly and are interactive.

### Task 4: Secure API Endpoint for Authenticated Users Only

#### Approach:

1. **Create a Protected Endpoint**: Created a protected endpoint for sensitive data.
2. **Use JWT Middleware**: Utilized the JWT middleware to protect this route.
3. **Error Handling**: Ensured unauthenticated requests return an appropriate error message.

## Usage

To use the API endpoints, you can send requests using tools like Postman or cURL. Below are sample requests:

### User Registration

POST http://localhost:3000/auth/register
Content-Type: application/json

{
"username": "user123",
"email": "test@gmail.com",
"password": "password123"
}

### User Login

POST http://localhost:3000/auth/login
Content-Type: application/json

{
"username": "user123",
"password": "password123"
}

### Fetch Data

GET http://localhost:3000/data
Authorization: Bearer <JWT_TOKEN>

Replace `<JWT_TOKEN>` with the JWT token obtained after successful login.


