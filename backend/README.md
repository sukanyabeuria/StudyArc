# 🦉 StudyArc Backend

StudyArc is a gamified "Study Together" web application designed for students and learners. It combines a Pomodoro timer, personal todo lists, study streaks, an XP and leveling progression system, leaderboards, and an AI study assistant powered by Google Gemini.

---

## 🛠️ Tech Stack

- **Runtime**: Node.js (v20+) with modern ES Modules (`import`/`export`)
- **Web Framework**: Express.js
- **Database**: MongoDB Atlas / local MongoDB with Mongoose ODM
- **Authentication**: Firebase Authentication & Firebase Admin SDK
- **AI Integration**: Google Gemini API
- **Security & Utilities**:
  - `helmet`: Secure HTTP headers
  - `cors`: Cross-Origin Resource Sharing configuration
  - `morgan`: HTTP request logger
  - `express-rate-limit`: Rate limiting protection
  - `dotenv`: Environment variable management

---

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── db.js             # MongoDB connection configuration
│   │   └── firebase.js       # Firebase Admin SDK initialization
│   ├── controllers/          # Business logic handlers for endpoints
│   ├── middleware/
│   │   ├── authMiddleware.js # Firebase ID token verification
│   │   ├── errorMiddleware.js# Centralized error handler
│   │   └── notFoundMiddleware.js # 404 handler
│   ├── models/               # Mongoose schemas (User, Todo, StudySession)
│   ├── routes/               # Express route declarations
│   ├── services/             # Domain logic (XP, Streaks, Gemini AI)
│   ├── utils/                # Helper functions
│   └── app.js                # Express app setup and middleware pipeline
├── .env                      # Local secrets (never committed)
├── .env.example              # Environment variables template
├── .gitignore                # Git ignore rules
├── package.json              # Project metadata and dependencies
├── server.js                 # Server entry point
└── README.md
```

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Configurable variables:

| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `PORT` | Port number for the Express server | `5000` |
| `NODE_ENV` | Environment (`development` / `production`) | `development` |
| `CLIENT_URL` | Frontend URL allowed for CORS | `http://localhost:5173` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://127.0.0.1:27017/focusnest` |
| `FIREBASE_SERVICE_ACCOUNT_PATH` | Path to service account JSON file | `./serviceAccountKey.json` |
| `FIREBASE_PROJECT_ID` | Firebase project ID (alternative) | `focusnest-app` |
| `FIREBASE_CLIENT_EMAIL` | Firebase service account client email | `firebase-adminsdk@...` |
| `FIREBASE_PRIVATE_KEY` | Firebase private key | `"-----BEGIN PRIVATE KEY-----\n..."` |
| `GEMINI_API_KEY` | Google Gemini API key | `AIzaSy...` |

---

## 🗄️ MongoDB Setup

1. **Local MongoDB**: Ensure your MongoDB service is running locally (`mongodb://127.0.0.1:27017/focusnest`).
2. **MongoDB Atlas (Cloud)**:
   - Create a free MongoDB Atlas cluster at [cloud.mongodb.com](https://cloud.mongodb.com/).
   - Create a database user and password.
   - Whitelist your IP address under Network Access (`0.0.0.0/0` for development).
   - Copy your connection string and set `MONGODB_URI` in `.env`.

---

## 🔥 Firebase Setup

1. Create a project at the [Firebase Console](https://console.firebase.google.com/).
2. Enable **Authentication** and choose sign-in methods (Email/Password, Google).
3. Go to **Project Settings > Service accounts**.
4. Click **Generate new private key** and download the JSON file.
5. Either:
   - Save the file as `serviceAccountKey.json` in the `backend/` directory (it is already in `.gitignore`) and set `FIREBASE_SERVICE_ACCOUNT_PATH=./serviceAccountKey.json`.
   - OR copy the `project_id`, `client_email`, and `private_key` into `.env`.

---

## 🚀 Running the Backend

Install dependencies:
```bash
npm install
```

Start development server with auto-reload:
```bash
npm run dev
```

Start production server:
```bash
npm start
```

---

## 🔐 How Authentication Works

1. Users sign up or log in through the frontend using Firebase Authentication.
2. Firebase returns a signed JWT **ID Token** to the client.
3. For protected backend endpoints, the frontend sends:
   ```http
   Authorization: Bearer <FIREBASE_ID_TOKEN>
   ```
4. Our `authMiddleware` intercepts the request, verifies the token with `firebase-admin`, and attaches the verified user info to `req.user`.
5. The verified Firebase UID is used to query or manipulate MongoDB records. User IDs supplied in request bodies or query params are never trusted.

---

---

## 📡 API Reference

All routes except `GET /api/health` require `Authorization: Bearer <token>`.

### 1. Health
- `GET /api/health` - Ping server status

### 2. Users & Profile
- `GET /api/users/me` - Fetch authenticated user's profile
- `PUT /api/users/me` - Update allowed profile fields (`name`, `avatar`)

### 3. Todos
- `GET /api/todos` - List user's todos
- `POST /api/todos` - Create a todo `{ title, description?, priority?, dueDate? }`
- `GET /api/todos/:id` - Fetch single todo (ownership protected)
- `PUT /api/todos/:id` - Update todo `{ title?, description?, completed?, priority?, dueDate? }`
- `DELETE /api/todos/:id` - Delete todo (ownership protected)

### 4. Study Sessions & Gamification
- `GET /api/sessions` - List user's past study sessions (supports `?page=1&limit=20`)
- `POST /api/sessions` - Record completed session `{ duration, type: "pomodoro", startedAt?, completedAt? }`
  - Awards 1 XP per study minute
  - Recalculates level dynamically
  - Tracks calendar-based daily study streaks

### 5. Leaderboard
- `GET /api/leaderboard` - Top 10 users ranked by total XP (also returns `currentUser` rank)

### 6. Gemini AI Study Assistant
- `POST /api/ai/ask` - Ask the study buddy `{ question: "Explain recursion simply" }`
  - Protected with rate limiting (20 requests per 15 minutes)
  - Returns formatted explanations

---

## 🧪 Testing the API

### 1. Automated Test Suite (All 6 Phases)
Run the automated end-to-end verification script:

```bash
node testAllPhases.js
```
Expected output:
```
==========================================
🎉 TEST SUMMARY: 17/17 tests passed!
==========================================
```

### 2. Manual Testing with cURL / Postman

**Create a Todo:**
```bash
curl -X POST http://localhost:5000/api/todos \
  -H "Authorization: Bearer dev_token_user123" \
  -H "Content-Type: application/json" \
  -d '{"title": "Read Chapter 3 on Data Structures", "priority": "high"}'
```

**Complete a 25-minute Pomodoro Session:**
```bash
curl -X POST http://localhost:5000/api/sessions \
  -H "Authorization: Bearer dev_token_user123" \
  -H "Content-Type: application/json" \
  -d '{"duration": 25, "type": "pomodoro"}'
```

**View the Leaderboard:**
```bash
curl http://localhost:5000/api/leaderboard \
  -H "Authorization: Bearer dev_token_user123"
```

**Ask Gemini AI:**
```bash
curl -X POST http://localhost:5000/api/ai/ask \
  -H "Authorization: Bearer dev_token_user123" \
  -H "Content-Type: application/json" \
  -d '{"question": "How does quicksort work?"}'
```

