# 📬 Subscription Tracker

A secure and minimal backend API to manage your personal subscriptions. Built with Node.js, Express, and MongoDB — following a clean, RESTful structure with modular controllers, middleware, and Arcjet-based spam protection.

---

## 🚀 Features

- ✅ **User Authentication** (Signup/Login with JWT)
- 📦 **Subscription CRUD** (Add, Update, Delete, Get)
- 🛡️ **Arcjet Integration** to prevent spam/bot abuse
- 🔗 **RESTful API** structure
- 🧱 Organized by MVC principles (Models, Controllers, Routes, Middleware)
- 🌱 `.env` support for environment-specific configs

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB + Mongoose
- **Security**: Arcjet, JWT, dotenv
- **Architecture**: RESTful, middleware-driven

---

## 📁 Project Structure
Subscription-Tracker/ ├── config/ # Arcjet & environment setup ├── controllers/ # Business logic ├── middlewares/ # Auth, Arcjet, error handler ├── models/ # Mongoose schemas ├── routes/ # All API routes ├── database/ # MongoDB connection ├── app.js # Entry point ├── .env # Environment variables (not committed) └── package.json


---

## ⚙️ Getting Started

### 1. Clone the Repo
```bash
git clone https://github.com/your-username/subscription-tracker.git
cd subscription-tracker
```
2. Install Dependencies
``` bash
npm install
```
3. Set Up Environment Variables
Create a .env file in the root with the following:
```bash
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ARCJET_SECRET=your_arcjet_key
```

4. Run the Server
```bash
npm start
```

🔌 API Endpoints

Method | Endpoint | Description
POST | /api/auth/signup | Register new user
POST | /api/auth/login | Login & get token
GET | /api/subscriptions | Get all subscriptions
POST | /api/subscriptions | Create a subscription
PUT | /api/subscriptions/:id | Update a subscription
DELETE | /api/subscriptions/:id | Delete a subscription

All /subscriptions routes are protected and require a valid JWT token.

🛡️ Arcjet Integration
Arcjet is used as a middleware to block bot traffic and spam attacks. Requests go through Arcjet before hitting sensitive endpoints.
