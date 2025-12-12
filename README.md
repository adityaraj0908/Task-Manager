# 🚀 Full-Stack Task Manager (Internship Assignment)

A full-stack task management application built with **React**, **Node.js**, **MySQL**, and **AWS Lambda**.  
This project demonstrates **microservices architecture**, a **clean folder structure**, and **mock AI integration**.

---

## ✨ Features

- **Microservice Auth**: Login handled via a standalone **AWS Lambda** function (Serverless Microservice).  
- **AI Integration**: “**Suggest Task Title**” using a mocked AI service to generate titles from descriptions.  
- **Task Workflow**: Clickable status badges cycling through **Pending → In Progress → Completed**.  
- **Visuals**: Dynamic color coding for **Priority (Low/Medium/High)** and **Status**.  
- **CRUD Operations**: Create, Read, Update, and Delete tasks.  
- **Filtering**: Real-time filtering by **Status** and **Priority**.  
- **Validation**: Prevents empty tasks and handles edge cases for dates and categories.

---

## 🛠️ Tech Stack

**Frontend:** React.js, Tailwind CSS, Axios  
**Backend:** Node.js, Express.js  
**Database:** MySQL (mysql2 with Promise wrapper)  
**Cloud:** AWS Lambda (Node.js runtime) for Authentication

---

## 📂 Folder Structure (Mandatory)

client/
├── src/
│ ├── components/ → Reusable UI (TaskItem, TaskForm)
│ ├── pages/ → Main Dashboard View
│ ├── services/ → API & AI logic
│ └── utils/
server/
├── config/ → Database connection (db.js)
├── controllers/ → Business logic (taskController.js)
├── models/ → SQL queries (taskModel.js)
├── routes/ → API endpoints (taskRoutes.js)


---

## ⚙️ Setup & Installation

### 1️⃣ Database Setup (MySQL)

```sql
CREATE DATABASE IF NOT EXISTS task_manager;
USE task_manager;

CREATE TABLE IF NOT EXISTS tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  priority ENUM('Low', 'Medium', 'High') DEFAULT 'Medium',
  dueDate DATE,
  status ENUM('Pending', 'In Progress', 'Completed') DEFAULT 'Pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```


---

## ⚙️ Setup & Installation

### 1️⃣ Database Setup (MySQL)

```sql
CREATE DATABASE IF NOT EXISTS task_manager;
USE task_manager;

CREATE TABLE IF NOT EXISTS tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  priority ENUM('Low', 'Medium', 'High') DEFAULT 'Medium',
  dueDate DATE,
  status ENUM('Pending', 'In Progress', 'Completed') DEFAULT 'Pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

```
### 2️⃣ Backend Setup 

```sql
cd server
npm install
```

create a .env file
```sql
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=task_manager
```
### 3️⃣ Frontend Setup 

```sql
cd client
npm install
npm run dev
```


## 🧪 How to Test the App

### 🔐 Login (AWS Lambda Microservice)

**Mock credentials:**

Username: admin
Password: mypass123



---

### 🤖 AI Suggestion

1. Go to **Create Task**
2. Enter a long description
3. Click **Suggest Title**
4. A mock AI-generated title appears

---

### 🔄 Status Workflow

1. Create a task  
2. Click **PENDING** → becomes **IN PROGRESS**  
3. Click again → becomes **COMPLETED**


---

## 🔧 Challenges Faced

- Implementing **microservice-based authentication** using AWS Lambda for the first time.  
- Handling **CORS issues** between Lambda, backend, and React during development.  
- Designing a **clean folder structure** that keeps controllers, models, and routes modular.  
- Ensuring **real-time updates** in UI when task status changes.  
- Creating a **mock AI feature** that feels realistic without any external API calls.

---

## 🚀 Improvements & Future Enhancements

- Add **JWT-based authentication** instead of mock login.  
- Implement **role-based access control** (Admin / User).  
- Add **Task Comments**, **File Attachments**, and **Subtasks**.  
- Integrate a real **AI model** (OpenAI) for smarter task title suggestions.  
- Add **dark mode** and improved UI animations.  
- Deploy the app using **Docker**, **AWS ECS**, or **Vercel**.  


---

