# 📖 FocusNest API Documentation & Reference Guide

**Base URL**: `http://localhost:5000/api`

---

## 🔐 Authentication Overview

All endpoints (except `GET /api/health`) require a Bearer token in the `Authorization` header:

```http
Authorization: Bearer <firebase-id-token>
```

> **Development Mode Shortcut**: When `ALLOW_DEV_AUTH=true` is set in your `.env`, you can test with:
> `Authorization: Bearer dev_token_<any_username>` (e.g., `dev_token_alex`)

---

## 📑 Quick Navigation

1. [Health Check](#1-health-check)
2. [User Profile](#2-user-profile)
3. [Personal Todos](#3-personal-todos)
4. [Study Sessions & Gamification](#4-study-sessions--gamification)
5. [Leaderboard](#5-leaderboard)
6. [Gemini AI Study Assistant](#6-gemini-ai-study-assistant)

---

## 1. Health Check

### `GET /api/health`
Checks if the server is running.

- **Auth Required**: No
- **Headers**: None

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "message": "FocusNest API is running"
}
```

---

## 2. User Profile

### `GET /api/users/me`
Retrieves the authenticated user's MongoDB profile. If it's the user's first time logging in via Firebase, this endpoint automatically creates their profile in MongoDB (JIT Provisioning).

- **Auth Required**: Yes (`Bearer <token>`)
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**: None

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "data": {
    "_id": "6728ab6491ab4bd2b2511919",
    "firebaseUid": "user_alex123",
    "name": "Alex Study Master",
    "email": "alex@focusnest.com",
    "avatar": "https://avatar.url/alex.png",
    "xp": 150,
    "level": 2,
    "totalStudyMinutes": 150,
    "currentStreak": 3,
    "longestStreak": 5,
    "lastStudyDate": "2026-09-12T15:00:00.000Z",
    "createdAt": "2026-09-10T10:00:00.000Z",
    "updatedAt": "2026-09-12T15:00:00.000Z"
  }
}
```

#### Error Responses
- `401 Unauthorized`: Token missing, malformed, or expired.

---

### `PUT /api/users/me`
Allows the user to update safe profile details (`name`, `avatar`). 
*Note: Gamification metrics (`xp`, `level`, `streak`) cannot be edited here.*

- **Auth Required**: Yes
- **Headers**: `Authorization: Bearer <token>`, `Content-Type: application/json`
- **Request Body**:
```json
{
  "name": "Alex The Scholar",
  "avatar": "https://images.com/new-avatar.png"
}
```

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "data": {
    "_id": "6728ab6491ab4bd2b2511919",
    "firebaseUid": "user_alex123",
    "name": "Alex The Scholar",
    "email": "alex@focusnest.com",
    "avatar": "https://images.com/new-avatar.png",
    "xp": 150,
    "level": 2,
    "totalStudyMinutes": 150,
    "currentStreak": 3,
    "longestStreak": 5,
    "lastStudyDate": "2026-09-12T15:00:00.000Z",
    "createdAt": "2026-09-10T10:00:00.000Z",
    "updatedAt": "2026-09-12T15:30:00.000Z"
  }
}
```

---

## 3. Personal Todos

### `GET /api/todos`
Returns all personal todos belonging exclusively to the authenticated user.

- **Auth Required**: Yes
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**: None

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "6728b10091ab4bd2b2511925",
      "userId": "6728ab6491ab4bd2b2511919",
      "title": "Complete Chapter 4 DSA",
      "description": "Dynamic Programming & Graphs",
      "completed": false,
      "priority": "high",
      "dueDate": "2026-09-15T23:59:59.000Z",
      "createdAt": "2026-09-12T12:00:00.000Z",
      "updatedAt": "2026-09-12T12:00:00.000Z"
    },
    {
      "_id": "6728b12091ab4bd2b2511926",
      "userId": "6728ab6491ab4bd2b2511919",
      "title": "Review React Hooks",
      "description": "useEffect cleanup functions",
      "completed": true,
      "priority": "medium",
      "dueDate": null,
      "createdAt": "2026-09-11T09:00:00.000Z",
      "updatedAt": "2026-09-11T11:00:00.000Z"
    }
  ]
}
```

---

### `POST /api/todos`
Creates a new personal todo item for the authenticated user.

- **Auth Required**: Yes
- **Headers**: `Authorization: Bearer <token>`, `Content-Type: application/json`
- **Request Body**:
```json
{
  "title": "Solve 3 LeetCode problems",
  "description": "Binary search and two pointers",
  "priority": "high",
  "dueDate": "2026-09-13T18:00:00.000Z"
}
```

#### Success Response (`201 Created`)
```json
{
  "success": true,
  "data": {
    "_id": "6728b15091ab4bd2b2511930",
    "userId": "6728ab6491ab4bd2b2511919",
    "title": "Solve 3 LeetCode problems",
    "description": "Binary search and two pointers",
    "completed": false,
    "priority": "high",
    "dueDate": "2026-09-13T18:00:00.000Z",
    "createdAt": "2026-09-12T15:45:00.000Z",
    "updatedAt": "2026-09-12T15:45:00.000Z"
  }
}
```

#### Error Responses
- `400 Bad Request`: `{"success": false, "message": "Please provide a todo title"}`

---

### `GET /api/todos/:id`
Fetch a specific todo by ID. Only succeeds if the authenticated user owns it.

- **Auth Required**: Yes
- **Parameters**: `:id` (MongoDB ObjectId of the todo)

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "data": {
    "_id": "6728b15091ab4bd2b2511930",
    "userId": "6728ab6491ab4bd2b2511919",
    "title": "Solve 3 LeetCode problems",
    "completed": false,
    "priority": "high",
    "dueDate": "2026-09-13T18:00:00.000Z",
    "createdAt": "2026-09-12T15:45:00.000Z"
  }
}
```

#### Error Responses
- `403 Forbidden`: If the todo belongs to another user.
- `404 Not Found`: If no todo exists with that ID.

---

### `PUT /api/todos/:id`
Updates fields of a personal todo (`title`, `description`, `completed`, `priority`, `dueDate`).

- **Auth Required**: Yes
- **Headers**: `Authorization: Bearer <token>`, `Content-Type: application/json`
- **Request Body**:
```json
{
  "completed": true
}
```

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "data": {
    "_id": "6728b15091ab4bd2b2511930",
    "userId": "6728ab6491ab4bd2b2511919",
    "title": "Solve 3 LeetCode problems",
    "completed": true,
    "priority": "high",
    "updatedAt": "2026-09-12T16:00:00.000Z"
  }
}
```

---

### `DELETE /api/todos/:id`
Permanently deletes a personal todo.

- **Auth Required**: Yes
- **Headers**: `Authorization: Bearer <token>`

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "message": "Todo deleted successfully"
}
```

---

## 4. Study Sessions & Gamification

### `GET /api/sessions`
Returns paginated list of completed study sessions for the authenticated user.

- **Auth Required**: Yes
- **Query Params**:
  - `page` (optional, default: `1`)
  - `limit` (optional, default: `20`)

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "count": 1,
  "pagination": {
    "page": 1,
    "limit": 20,
    "totalPages": 1,
    "total": 1
  },
  "data": [
    {
      "_id": "6728c20091ab4bd2b2511940",
      "userId": "6728ab6491ab4bd2b2511919",
      "duration": 25,
      "type": "pomodoro",
      "startedAt": "2026-09-12T15:00:00.000Z",
      "completedAt": "2026-09-12T15:25:00.000Z",
      "createdAt": "2026-09-12T15:25:00.000Z"
    }
  ]
}
```

---

### `POST /api/sessions`
Logs a completed study session and **automatically updates gamification stats**:
- Awards **1 XP per minute**
- Recalculates user **level**
- Checks and updates **daily streaks** (calendar day comparison)
- Increments **total study minutes**

- **Auth Required**: Yes
- **Headers**: `Authorization: Bearer <token>`, `Content-Type: application/json`
- **Request Body**:
```json
{
  "duration": 25,
  "type": "pomodoro",
  "startedAt": "2026-09-12T15:00:00.000Z",
  "completedAt": "2026-09-12T15:25:00.000Z"
}
```

#### Success Response (`201 Created`)
```json
{
  "success": true,
  "data": {
    "session": {
      "_id": "6728c20091ab4bd2b2511940",
      "userId": "6728ab6491ab4bd2b2511919",
      "duration": 25,
      "type": "pomodoro",
      "startedAt": "2026-09-12T15:00:00.000Z",
      "completedAt": "2026-09-12T15:25:00.000Z",
      "createdAt": "2026-09-12T15:25:00.000Z"
    },
    "gamification": {
      "xpGained": 25,
      "totalXp": 125,
      "level": 2,
      "leveledUp": true,
      "nextLevelXp": 250,
      "currentStreak": 3,
      "longestStreak": 5,
      "totalStudyMinutes": 125
    }
  }
}
```

---

## 5. Leaderboard

### `GET /api/leaderboard`
Fetches top users ranked by total XP. Also calculates and includes the calling user's individual rank even if they aren't in the top 10.

- **Auth Required**: Yes
- **Query Params**:
  - `limit` (optional, default: `10`, max: `50`)

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "rank": 1,
      "_id": "6728ab6491ab4bd2b2511919",
      "name": "Alice Study Master",
      "avatar": "https://avatar.url/alice.png",
      "xp": 3500,
      "level": 9,
      "totalStudyMinutes": 3500,
      "currentStreak": 14
    },
    {
      "rank": 2,
      "_id": "6728d11191ab4bd2b2511950",
      "name": "Devin Code",
      "avatar": "",
      "xp": 2100,
      "level": 7,
      "totalStudyMinutes": 2100,
      "currentStreak": 8
    },
    {
      "rank": 3,
      "_id": "6728d22291ab4bd2b2511951",
      "name": "Sarah Student",
      "avatar": "",
      "xp": 820,
      "level": 4,
      "totalStudyMinutes": 820,
      "currentStreak": 3
    }
  ],
  "currentUser": {
    "rank": 1,
    "userId": "6728ab6491ab4bd2b2511919",
    "name": "Alice Study Master",
    "xp": 3500,
    "level": 9
  }
}
```

---

## 6. Gemini AI Study Assistant

### `POST /api/ai/ask`
Sends a study question to the backend, which queries Google Gemini with an educational tutor persona and returns a structured explanation.

- **Auth Required**: Yes
- **Rate Limit**: Max 20 requests per 15 minutes
- **Headers**: `Authorization: Bearer <token>`, `Content-Type: application/json`
- **Request Body**:
```json
{
  "question": "Explain binary search simply using an analogy"
}
```

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "data": {
    "question": "Explain binary search simply using an analogy",
    "answer": "Imagine you are looking up the word **\"Penguin\"** in a physical dictionary:\n\n1. You open the dictionary directly in the middle (letter **M**).\n2. Since **P** comes after **M**, you can ignore the entire first half of the book.\n3. You split the remaining second half in half again (letter **T**).\n4. Since **P** comes before **T**, you ignore the right half.\n5. You repeat this until you land right on **Penguin**!\n\nThat is **Binary Search**: each step halves the search area, making it super fast ($O(\\log n)$)!"
  }
}
```

#### Error Responses
- `400 Bad Request`: `{"success": false, "message": "Please provide a valid question for the AI study assistant"}`
- `429 Too Many Requests`: `{"success": false, "message": "Too many AI requests from this IP, please take a short study break and try again later."}`

---

## 🛑 Centralized Error Format

Every error returned by the API follows this exact uniform shape:

```json
{
  "success": false,
  "message": "Specific explanation of what went wrong",
  "stack": "...(only visible when NODE_ENV=development)..."
}
```

### Standard Status Codes
- `200 OK`: Request succeeded.
- `201 Created`: Resource successfully created.
- `400 Bad Request`: Validation failure or missing input.
- `401 Unauthorized`: Missing or invalid Bearer token.
- `403 Forbidden`: Attempting to access another user's data.
- `404 Not Found`: Resource or URL does not exist.
- `429 Too Many Requests`: Rate limit exceeded.
- `500 Internal Server Error`: Server error (safely sanitized).
