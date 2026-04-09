# 📝 Task Manager Application  
https://task-master-frontend-two.vercel.app/  
A full-stack Task Manager application that allows users to create, manage, and organize tasks and subtasks with a clean UI and RESTful API.

---

## 🚀 Features

### ✅ Core Features

* Create new tasks
* View all tasks
* Mark tasks as completed/incomplete
* Delete tasks
* Edit task titles (inline editing)

### ✅ Subtasks (Advanced Feature)

* Add subtasks to each task
* Mark subtasks as completed/incomplete
* Delete subtasks
* Nested task structure

### ✅ UI & UX Enhancements

* Clean and responsive UI
* Custom checkbox-style toggle
* Inline editing (double-click to edit)
* Smooth animations
* Real-time updates

### ✅ Filtering

* View all tasks
* Filter completed tasks
* Filter pending tasks

---

## 🛠️ Tech Stack

### Frontend

* React (Functional Components, Hooks)
* HTML/CSS/JS

### Backend

* Node.js
* Express.js

---

## 📂 Project Structure

```
TaskMaster/
│
├── backend/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│
├── .gitignore
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone <your-repo-link>
cd TaskMaster
```

---

### 2️⃣ Setup Backend

```bash
cd backend
npm install
node server.js
```

Server runs on:

```
http://localhost:5000
```

---

### 3️⃣ Setup Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm start
```

App runs on:

```
http://localhost:3000
```

---

## 🔌 API Endpoints

### Tasks

* `GET /tasks` → Get all tasks
* `POST /tasks` → Create new task
* `PATCH /tasks/:id` → Toggle or edit task
* `DELETE /tasks/:id` → Delete task

### Subtasks

* `POST /tasks/:id/subtasks` → Add subtask
* `PATCH /tasks/:taskId/subtasks/:subId` → Toggle or edit subtask
* `DELETE /tasks/:taskId/subtasks/:subId` → Delete subtask

---

## 🧠 Key Concepts Implemented

* RESTful API design
* CRUD operations
* Nested data handling (tasks with subtasks)
* React state management (useState, useEffect)
* API integration using fetch
* Conditional rendering
* Event handling

---

---

## 👩‍💻 Author

**Harshita Gaur**
