# 💬 ChatApp

A fullstack real-time chat application built with React, Node.js, and Socket.io.

🔗 **Live Demo:** [https://fullstack-chat-application-sfv3.onrender.com/login](https://fullstack-chat-application-sfv3.onrender.com/login)

---

## ✨ Features

- 🔐 JWT-based authentication (Signup / Login / Logout)
- 💬 Real-time messaging with Socket.io
- 🟢 Online/Offline user presence indicators
- 🖼️ Image sharing in chat
- 📷 Profile photo upload
- 📱 Responsive UI with Tailwind CSS
- 🗂️ User list with live online status

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Zustand (state management)

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- Socket.io
- JWT Authentication
- Cloudinary (image uploads)

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB URI
- Cloudinary account

### 1. Clone the repository

```bash
git clone https://github.com/your-username/chat-app.git
cd chat-app
```

### 2. Setup environment variables

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Install dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 4. Run the app

```bash
# Backend
cd backend
npm run dev

# Frontend
cd ../frontend
npm run dev
```

Frontend runs on `http://localhost:5173`  
Backend runs on `http://localhost:5000`

---

## 📁 Project Structure

```
chat-app/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── lib/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   └── lib/
│   └── index.html
└── README.md
```

---

## 🌐 Deployment

Deployed on [Render](https://render.com). The backend serves the frontend as static files in production.

---

## 📄 License

MIT License © 2025
# Fullstack-Chatting-Application
