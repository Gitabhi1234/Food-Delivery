# API Documentation

## POST /users/register

**Description:**  
This endpoint registers a new user. It validates the provided data, checks if the email already exists, hashes the user's password, creates the user record in the database, and returns a JWT token for authentication.

---

### HTTP Method:
**POST**

---

### Request Body

The expected request body is a JSON object containing the following fields:

- **fullname** (object)
  - **firstname** (string, required): Must be at least 3 characters long.
  - **lastname** (string, optional): If provided, should be at least 3 characters long.
- **email** (string, required): Must be a valid email address.
- **password** (string, required): Must be at least 6 characters long.

---

### Example Response

#### Success (201 Created)

Example:  
- **user**:  
  - **\_id**: "60a7c0fbd2a5b718a8e5a123"  
  - **fullname**:  
    - **firstname**: "John"  
    - **lastname**: "Doe"  
  - **email**: "john@example.com"  
- **token**: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

---

## POST /users/login

**Description:**  
This endpoint logs in an existing user. It validates the provided credentials, verifies the user's email and password, and returns a JWT token along with the user’s data upon successful authentication.

---

### HTTP Method:
**POST**

---

### Request Body

The expected request body is a JSON object containing the following fields:

- **email** (string, required): Must be a valid email address.
- **password** (string, required): The user's password.

---

### Example Response

#### Success (200 OK)

Example:  
- **token**: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
- **user**:  
  - **\_id**: "60a7c0fbd2a5b718a8e5a123"  
  - **fullname**:  
    - **firstname**: "John"  
    - **lastname**: "Doe"  
  - **email**: "john@example.com"

---

## GET /users/profile

**Description:**  
This endpoint retrieves the profile details of the currently authenticated user. A valid JWT token must be provided—either via a cookie named "token" or through the Authorization header—in order to access the user’s data.

---

### HTTP Method:
**GET**

---

### Request Headers:
- **Authorization**: Bearer &lt;jwt_token&gt; (optional if token is provided via cookie)
- **Cookie**: token=&lt;jwt_token&gt; (optional if token is provided via Authorization header)

---

### Example Response

#### Success (200 OK)

Example:  
- **user**:  
  - **\_id**: "60a7c0fbd2a5b718a8e5a123"  
  - **fullname**:  
    - **firstname**: "John"  
    - **lastname**: "Doe"  
  - **email**: "john@example.com"

---

## POST /users/logout

**Description:**  
This endpoint logs out the currently authenticated user. It blacklists the current JWT token and clears the "token" cookie. A valid JWT token must be provided for this operation.

---

### HTTP Method:
**POST**

---

### Request Headers:
- **Authorization**: Bearer &lt;jwt_token&gt; (or token provided via cookie)
- **Cookie**: token=&lt;jwt_token&gt;

---

### Example Response

#### Success (200 OK)

Example:  
- **message**: "Logged out"

---

# API Documentation – Partner Routes

## POST /partners/register

**Description:**  
This endpoint registers a new partner. It validates the provided data—including partner's full name, email, password, and vehicle details—ensures the email is not already registered, creates the partner record in the database, and returns a JWT token for authentication.

**HTTP Method:**  
POST

**Request Body Parameters:**  
- **fullname** (object)  
  - **firstname** (string, required): Must be at least 3 characters long.  
  - **lastname** (string, optional): If provided, must be at least 3 characters long.
- **email** (string, required): Must be a valid email address.  
- **password** (string, required): Must be at least 6 characters long.  
- **vehicle** (object)  
  - **color** (string, required): Must be at least 3 characters long.  
  - **plate** (string, required): Must be at least 3 characters long.  
  - **vehicleType** (string, required): Acceptable values are "car", "motorcycle", or "auto".

**Example Response**

#### Success (201 Created)

Example:  
- **token**: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."  
- **partner**:  
  - **_id**: "60a7c0fbd2a5b718a8e5a123"  
  - **fullname**:  
    - **firstname**: "Jane"  
    - **lastname**: "Doe"  
  - **email**: "jane@example.com"  
  - **vehicle**:  
    - **color**: "Red"  
    - **plate**: "XYZ123"  
    - **vehicleType**: "motorcycle"

---

## POST /partners/login

**Description:**  
This endpoint logs in an existing partner. It validates the email and password, verifies the credentials, and returns a JWT token along with the partner’s details upon successful authentication.

**HTTP Method:**  
POST

**Request Body Parameters:**  
- **email** (string, required): Must be a valid email address.  
- **password** (string, required): The partner's password.

**Example Response**

#### Success (200 OK)

Example:  
- **token**: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."  
- **partner**:  
  - **_id**: "60a7c0fbd2a5b718a8e5a123"  
  - **fullname**:  
    - **firstname**: "Jane"  
    - **lastname**: "Doe"  
  - **email**: "jane@example.com"  
  - **vehicle**:  
    - **color**: "Red"  
    - **plate**: "XYZ123"  
    - **vehicleType**: "motorcycle"

---

## GET /partners/profile

**Description:**  
This endpoint retrieves the profile details of the currently authenticated partner. A valid JWT token must be provided — either via a cookie named "token" or through the Authorization header — in order to access the partner’s data.

**HTTP Method:**  
GET

**Request Headers:**  
- **Authorization:** `Bearer <jwt_token>`  
- or as a Cookie: `token=<jwt_token>`

**Example Response**

#### Success (200 OK)

Example:  
- **partner**:  
  - **_id**: "60a7c0fbd2a5b718a8e5a123"  
  - **fullname**:  
    - **firstname**: "Jane"  
    - **lastname**: "Doe"  
  - **email**: "jane@example.com"  
  - **vehicle**:  
    - **color**: "Red"  
    - **plate**: "XYZ123"  
    - **vehicleType**: "motorcycle"

---

## POST /partners/logout

**Description:**  
This endpoint logs out the currently authenticated partner. It blacklists the current JWT token and clears the "token" cookie. A valid JWT token must be provided with the request.

**HTTP Method:**  
POST

**Request Headers:**  
Provide the token in one of the following ways:  
- **Authorization:** `Bearer <jwt_token>`  
- or as a Cookie: `token=<jwt_token>`


**Example Response**

#### Success (200 OK)

Example:  
- **message**: "Logout successfully"

