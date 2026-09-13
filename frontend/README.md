# 🦉 StudyArc Frontend

A cozy, gamified "Study Together" web application inspired by warm orange & black LoFi aesthetics.

---

## 🎨 Design Features

- **Cozy LoFi Aesthetic**: Deep charcoal panels, warm amber/orange glows, and ambient anime study room artwork.
- **Unified Navigation**: Switch seamlessly between **Landing Hero**, **Cozy Study Room**, **Interactive Workspace**, and **Global Leaderboard**.
- **Interactive Tools**:
  - **Pomodoro Timer**: Circular glowing SVG countdown ring with sound chimes, mode switcher (Pomodoro, Short Break, Long Break), and automatic session logging.
  - **Personal To-Do List**: Filter tabs (`All`, `Active`, `Completed`), custom styled checkboxes, and priority tags.
  - **LoFi Music Room**: 24/7 relaxing chill beats audio player + YouTube custom stream embedder.
  - **AI Study Assistant**: Real-time Gemini-powered homework companion with quick prompt chips.
  - **Live Leaderboard**: Displays top learners ranked by XP, streaks, and level badges.
- **Authentication**:
  - Supports Firebase Auth and instant 1-click Demo Login for testing as *Debasis*.

---

## 🚀 Running the Frontend

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open your browser at [http://localhost:5173](http://localhost:5173).

---

## 🔗 Connecting to the Backend

Make sure the backend server is running on port 5000:
```bash
cd ../backend
npm run dev
```

The frontend automatically communicates with `http://localhost:5000/api` and stores user authentication tokens in `localStorage`.
