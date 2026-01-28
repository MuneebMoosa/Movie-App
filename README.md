# 🎬 Movie App – MERN Stack (CRUD)

A full-stack **Movie Management Application** built using the **MERN stack**.  
The app supports **Admin and Normal Users**, enabling movie CRUD operations, user interaction through comments, and an admin dashboard with analytics.

---

## 👥 User Roles

### Admin
- Create, update, and delete movies
- Manage genres
- View users and comments
- Access dashboard analytics

### User
- Register and log in
- View movies and movie details
- Add comments/reviews

---

## 🚀 Features
- Authentication & authorization (JWT)
- Role-based access control
- Movie CRUD operations
- Genre management
- Comments & reviews
- Admin dashboard with statistics
- Responsive UI with Tailwind CSS

---

## 🛠 Tech Stack

### Frontend
- React
- Tailwind CSS
- Redux Toolkit
- RTK Query

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Authentication
- JWT
- bcrypt

---

## 📁 Setup & Installation

### Prerequisites
- Node.js
- MongoDB
- Git

---

### Environment Variables
Create a `.env` file in the backend directory:
```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
