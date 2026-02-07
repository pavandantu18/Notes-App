# 📝 Fullstack Notes App

A modern **full-stack Notes application** that allows users to create, view, update, and delete notes with a clean and responsive UI.  
The app is built with a **React frontend** and a **Node.js backend**, following a simple REST API architecture.

🔗 **Live Demo:**  
https://notes-app-a535.onrender.com/

---

## 🚀 Features

- Create notes with title and description
- View all saved notes in a modern card-based UI
- Edit notes using a popup modal (description only)
- Delete notes with confirmation
- Toast notifications for user actions
- Responsive design for desktop and mobile
- Clean UX with smooth animations

---

## 🧠 How I Built This Application

### Frontend
The frontend is built using **React** with functional components and hooks.

- Used `useState` and `useEffect` for state management and lifecycle handling
- Axios is used to communicate with the backend REST APIs
- Implemented a modal-based edit experience instead of inline editing for better UX
- Used modern CSS (glassmorphism style) for cards, modals, buttons, and toasts
- Added UX enhancements such as:
  - Click-outside and ESC key to close modals
  - Loading spinner during updates
  - Toast notifications for success and error states

### Backend
The backend is built using **Node.js** and **Express**.

- Exposed RESTful APIs for CRUD operations:
  - `GET /api/notes`
  - `POST /api/notes`
  - `PATCH /api/notes/:id`
  - `DELETE /api/notes/:id`
- Handles request validation and error handling
- Connected to a database for persistent storage (MongoDB)
- Deployed backend and frontend together on Render

---

## 🛠 Tech Stack

### Frontend
- React
- JavaScript (ES6+)
- Axios
- HTML5
- CSS3

### Backend
- Node.js
- Express.js
- MongoDB
- REST API architecture

### Deployment
- Render (Fullstack deployment)

---
