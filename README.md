#  Finance Dashboard Backend

##  Overview

This project is a backend system for a finance dashboard where different users (viewer, analyst, admin) interact with financial data based on their roles.

The system supports:

* User management with roles
* Financial record management
* Dashboard analytics
* Role-based access control

The main goal was to design a **clean, structured backend** that can serve data efficiently to a frontend dashboard.

---

##  Features

###  User & Role Management

* Create and manage users
* Assign roles: viewer, analyst, admin
* Manage user status (active/inactive)
* Role-based access control using middleware

---

###  Financial Records

* Create, update, delete financial records
* Fields:

  * amount
  * type (income / expense)
  * category
  * date
  * notes
* Filtering:

  * by type
  * by category
  * by date range
* Pagination support
* Search functionality (category + notes)
* Soft delete (records are not permanently removed)

---

###  Analytics APIs

* Total income
* Total expenses
* Net balance
* Category-wise totals
* Monthly trends (income vs expense)
* Recent transactions

Aggregation is done using MongoDB pipelines for better performance.

---

###  Access Control

* Middleware-based role checking
* Permissions:

  * Viewer → read only
  * Analyst → read + analytics
  * Admin → full access (CRUD + analytics)
* User status enforcement (inactive users blocked)

---

###  Validation & Error Handling

* Joi-based input validation
* Proper error messages
* Correct HTTP status codes
* Invalid operations handled safely

  * invalid IDs
  * updating deleted records
  * invalid input

---

##  Project Structure

```
src/
 ├── models/
 ├── controllers/
 ├── services/
 ├── routes/
 ├── middlewares/
 ├── utils/
 └── app.js
```

Architecture used:

```
Routes → Controllers → Services → Models
```

---

##  Data Persistence

* Database: MongoDB
* ODM: Mongoose

Data is stored persistently and structured using schemas.

Soft delete is implemented using:

```
isDeleted: true
```

This prevents permanent data loss.

---

##  Setup Instructions

### 1. Clone the repository

```
git clone <your-repo-link>
cd <project-folder>
```

### 2. Install dependencies

```
npm install
```

### 3. Create `.env` file

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

### 4. Run the server

```
npm run dev
```

### 5. Open in browser

```
http://localhost:5000
```

---

##  API Endpoints

###  Users

| Method | Endpoint       | Description   |
| ------ | -------------- | ------------- |
| POST   | /api/users     | Create user   |
| GET    | /api/users     | Get all users |
| PUT    | /api/users/:id | Update user   |

---

###  Records

| Method | Endpoint         | Description                |
| ------ | ---------------- | -------------------------- |
| POST   | /api/records     | Create record              |
| GET    | /api/records     | Get records (with filters) |
| PUT    | /api/records/:id | Update record              |
| DELETE | /api/records/:id | Soft delete record         |

#### Example filters:

```
/api/records?type=expense
/api/records?category=food
/api/records?startDate=2026-04-01&endDate=2026-04-30
/api/records?search=rent
/api/records?page=1&limit=5
```

---

###  Analytics

| Method | Endpoint                  | Description              |
| ------ | ------------------------- | ------------------------ |
| GET    | /api/analytics/summary    | Income, expense, balance |
| GET    | /api/analytics/categories | Category totals          |
| GET    | /api/analytics/trends     | Monthly trends           |
| GET    | /api/analytics/recent     | Recent records           |

---

##  Testing

A simple frontend (`index.html`) is provided to:

* Switch roles dynamically
* Test APIs without Postman

---

##  Assumptions

* Role is passed via headers (no authentication implemented)
* Single currency system
* One user per record (via userId)
* Frontend is only for testing (not production UI)

---

##  Trade-offs

* Authentication (JWT) not implemented to keep scope simple
* Used MongoDB instead of relational DB for flexibility
* Role is simulated using headers instead of real login system
* Soft delete used instead of hard delete for safety

---

##  Future Improvements

* JWT authentication
* Proper login system
* Role-based frontend dashboard
* Advanced analytics (yearly trends, predictions)
* Caching using Redis
* Deployment (AWS / Render)

---

##  Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* Joi

---

##  Author

Jashwanth Bandi

---
