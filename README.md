# TaskManagerAPI

A full-stack task management web application that allows users to create accounts and manage their personal tasks. Built as a portfolio project to demonstrate clean architecture, REST API design, JWT authentication, and modern frontend development.

---

## Tech Stack

**Backend**
- ASP.NET Core Web API (.NET 8)
- Entity Framework Core
- SQL Server
- JWT Authentication
- BCrypt password hashing

**Frontend**
- React 19 (Vite)
- React Router DOM
- Axios

---

## Screenshots

### Login Page
<img width="1280" height="800" alt="Screenshot 2026-06-05 203240" src="https://github.com/user-attachments/assets/c98db1f9-9f3e-4edc-bc6a-d46736607c89" />

### Register Page
<img width="1280" height="800" alt="Screenshot 2026-06-05 203331" src="https://github.com/user-attachments/assets/2c009b18-a10c-4b6f-b310-d54d8db1eaf2" />


### Dashboard
<img width="1280" height="640" alt="Screenshot 2026-06-05 204143" src="https://github.com/user-attachments/assets/22d0a601-6b68-42a1-8b53-c307cabdd847" />

---
<img width="1280" height="640" alt="Screenshot 2026-06-05 204703" src="https://github.com/user-attachments/assets/6434f65c-a779-40d5-b6fc-c6c7581b8501" />

---
<img width="1280" height="640" alt="Screenshot 2026-06-05 204714" src="https://github.com/user-attachments/assets/ea201014-309c-4828-88db-a45d479ca9a7" />

---
<img width="1280" height="640" alt="Screenshot 2026-06-05 204726" src="https://github.com/user-attachments/assets/ec73dcb4-6dd2-497b-a931-edbec852a630" />

---
<img width="1280" height="640" alt="Screenshot 2026-06-05 204758" src="https://github.com/user-attachments/assets/c346dd1c-a4d1-4e0c-9819-8716437dc5cc" />


---

## Getting Started

### Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) (or SQL Server Express)
- [Node.js](https://nodejs.org/) (v18+)

---

### Backend Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/Khumo775-RAM/TaskManagerAPI.git
   cd TaskManagerAPI
   ```

2. **Configure your local settings**

   Create an `appsettings.Development.json` file in the root of the project:

   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Server=YOUR_SERVER\\SQLEXPRESS;Database=TaskManagerDB;Trusted_Connection=True;TrustServerCertificate=True;"
     },
     "Jwt": {
       "Key": "YOUR_JWT_SECRET_KEY_MIN_32_CHARS",
       "Issuer": "TaskManagerAPI",
       "Audience": "TaskManagerClient"
     }
   }
   ```

   Replace `YOUR_SERVER` with your SQL Server instance name and `YOUR_JWT_SECRET_KEY_MIN_32_CHARS` with a secret key of at least 32 characters.

3. **Apply database migrations**

   ```bash
   dotnet ef database update
   ```

4. **Run the API**

   ```bash
   dotnet run
   ```

   The API will be available at `https://localhost:7001` (or the port shown in your terminal).  
   Swagger UI is available at `https://localhost:7001/swagger` in development.

---

### Frontend Setup

1. **Navigate to the frontend folder**

   ```bash
   cd frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`.

---

## API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register a new user | No |
| POST | `/api/auth/login` | Login and receive a JWT token | No |

**Register request body:**
```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

**Login request body:**
```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

**Auth response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

### Tasks

All task endpoints require a valid JWT token in the `Authorization` header:
```
Authorization: Bearer <your_token>
```

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks for the logged-in user |
| GET | `/api/tasks/{id}` | Get a specific task by ID |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/{id}` | Update an existing task |
| DELETE | `/api/tasks/{id}` | Delete a task |

**Create / Update task request body:**
```json
{
  "title": "Finish project",
  "description": "Complete the task manager app",
  "dueDate": "2026-04-01T00:00:00",
  "priority": 1
}
```

Priority values: `0` = Low, `1` = Medium, `2` = High

**Task response:**
```json
{
  "id": 1,
  "title": "Finish project",
  "description": "Complete the task manager app",
  "dueDate": "2026-04-01T00:00:00",
  "priority": 1,
  "isCompleted": false,
  "createdAt": "2026-03-17T10:00:00"
}
```

---

## Folder Structure

```
TaskManagerAPI/
├── Controllers/
│   ├── AuthController.cs
│   └── TasksController.cs
├── Data/
│   └── AppDbContext.cs
├── DTOs/
│   ├── AuthResponseDto.cs
│   ├── CreateTaskDto.cs
│   ├── LoginRequestDto.cs
│   ├── RegisterRequestDto.cs
│   └── TaskResponseDto.cs
├── Migrations/
├── Models/
│   ├── Priority.cs
│   ├── TaskItem.cs
│   └── User.cs
├── Services/
│   ├── AuthService.cs
│   ├── IAuthService.cs
│   ├── ITaskService.cs
│   └── TaskService.cs
├── appsettings.json
└── Program.cs

frontend/
├── src/
│   ├── pages/
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   └── DashboardPage.jsx
│   ├── services/
│   │   ├── authService.js
│   │   └── taskService.js
│   ├── App.jsx
│   └── main.jsx
├── index.html
└── vite.config.js
```

---

## Features

- User registration and login with hashed passwords
- JWT-based authentication with protected routes
- Create, edit, delete, and complete tasks
- Set task priority (Low / Medium / High) with colour coding
- Filter tasks by completion status
- Each user only sees their own tasks
- Responsive and clean UI

---

## Purpose

This project was built to demonstrate full-stack development skills including REST API design, authentication, database integration, and React frontend development.
