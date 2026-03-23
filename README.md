# Full Stack Task Manager Application

Build a full stack task management web application that allows users to create accounts and manage personal tasks. The application should demonstrate clean architecture, REST API design, authentication, and a modern frontend.

## Tech Stack

Backend:
- ASP.NET Core Web API (.NET 8)
- Entity Framework Core
- SQL Server
- JWT Authentication

Frontend:
- React (Vite)
- Axios for API requests
- Basic CSS or Tailwind

## Core Features

### User Authentication
Users must be able to:

- Register an account
- Login
- Receive a JWT token
- Access protected task endpoints

Endpoints:
POST /api/auth/register  
POST /api/auth/login

Passwords must be hashed.

---

### Task Management

Authenticated users can manage tasks.

Task properties:
- Id
- Title
- Description
- Priority (Low / Medium / High)
- DueDate
- IsCompleted
- CreatedAt
- UserId

Endpoints:

GET /api/tasks  
GET /api/tasks/{id}  
POST /api/tasks  
PUT /api/tasks/{id}  
DELETE /api/tasks/{id}

Each user should only see their own tasks.

---

### Task Features

Users should be able to:

- Create tasks
- Edit tasks
- Delete tasks
- Mark tasks as completed
- View all tasks
- Filter tasks by completion status
- Sort tasks by due date

---

## Database

Use SQL Server with Entity Framework Core.

Tables:

Users
- Id
- Email
- PasswordHash
- CreatedAt

Tasks
- Id
- Title
- Description
- Priority
- DueDate
- IsCompleted
- CreatedAt
- UserId

Relationships:
One user -> many tasks.

---

## Frontend Pages

The React application should include:

Login Page  
Register Page  
Dashboard Page

Dashboard features:

- Display all tasks
- Create new task form
- Mark task as complete
- Edit task
- Delete task
- Filter tasks

---

## UI Requirements

Keep the UI simple but clean.

Dashboard layout:

Header  
Task Creation Form  
Task List

Task List should show:

Title  
Priority  
Due Date  
Completion Status

---

## API Design Requirements

- Use RESTful API conventions
- Return proper HTTP status codes
- Use DTOs instead of exposing database models
- Validate incoming requests

---

## Folder Structure

Backend:

/Controllers  
/Models  
/DTOs  
/Services  
/Data  
/Migrations

Frontend:

/components  
/pages  
/services  
/hooks

---

## Bonus Features (Optional)

If time allows, add:

- Task search
- Task priority colors
- Dashboard statistics (completed vs pending tasks)
- Dark mode
- Pagination

---

## README Requirements

Include in the README:

- Project overview
- Technologies used
- Setup instructions
- API endpoints
- Screenshots

---

## Goal

The purpose of this project is to demonstrate:

- Full stack development
- REST API design
- Authentication
- Database integration
- React frontend development

This project should be clean, well structured, and suitable for a software developer internship portfolio.