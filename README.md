# 📚 StudyArc

## Hackathon prototype quick start

StudyArc is a full-stack AI-powered study and productivity platform designed
to help students organize their studies, maintain focus, track study
activity, and understand their productivity patterns.

The application consists of a React/Vite frontend, Node.js/Express backend,
MongoDB persistence, authentication support, and Gemini-powered AI
functionality.

For local development, MongoDB runs locally and the backend runs on port
5001. The frontend runs through Vite on port 5173.

Terminal 1:

```bash
cd backend
npm install
npm start

Terminal 2:

cd frontend
npm install
npm run dev

The frontend communicates with the backend through:

http://localhost:5001/api

The frontend development application is normally available at:

http://localhost:5173

MongoDB should be running locally on:

mongodb://127.0.0.1:27017

A full-stack AI-powered study planning, focus tracking and productivity
platform designed to help students organize their academic workload,
maintain focused study sessions, track progress, and receive intelligent
study assistance.

Current Stage: Full-stack application integration and local development
setup complete. Frontend + Backend + MongoDB integration is operational
locally. Production deployment is the next phase.

📌 About the Project

StudyArc combines:

Study task management
Focus sessions
Productivity tracking
Study history
Productivity analytics
AI-powered study assistance
User profiles
Authentication
MongoDB persistence
REST APIs
Modern React frontend
Responsive user interface

The platform is designed around a simple idea:

Plan your studies → Focus on your work → Track your progress → Improve
your productivity.

Instead of using separate applications for planning, studying, and tracking
progress, StudyArc brings these activities together into a single platform.

🎯 Problem Statement

Students often struggle with:

Unstructured study schedules
Difficulty maintaining focus
Poor visibility into study progress
Inconsistent study habits
Difficulty measuring productivity
Lack of personalized study guidance
Managing multiple academic tasks

StudyArc addresses these challenges by providing a centralized platform
where students can manage their study workload, focus on individual tasks,
track their activity, and use AI-powered assistance to improve their
learning process.

💡 Solution

StudyArc provides a unified productivity ecosystem:

Study Planning
      ↓
Task Management
      ↓
Focused Study Sessions
      ↓
Activity Tracking
      ↓
Progress Analytics
      ↓
AI-Powered Assistance
      ↓
Improved Study Habits

The platform helps students transform their study routine from an
unstructured process into a measurable and organized workflow.

🚀 Key Features
🔐 Authentication

StudyArc provides user authentication and account management.

Implemented functionality includes:

User registration
User login
Authentication state management
User-specific data
Protected application functionality
Session persistence
Logout
User identity management

Authentication functionality can be configured using the available Firebase
and development authentication configuration.

👤 User Profile

StudyArc provides a personalized user experience.

User information can be associated with:

Account details
Study tasks
Focus sessions
Study history
Productivity statistics
Personalized study activity

All user-specific study information is designed to remain associated with
the corresponding account.

📋 Study Task Management

StudyArc allows students to organize their academic workload into
manageable study tasks.

Users can:

Create study tasks
View study tasks
Manage pending tasks
Track completed tasks
Organize their study workload
Focus on individual study objectives

The objective is to convert large academic goals into smaller actionable
tasks.

Example:

Semester Exam
      │
      ├── Mathematics
      │     ├── Calculus
      │     ├── Probability
      │     └── Linear Algebra
      │
      ├── Computer Science
      │     ├── DSA
      │     └── DBMS
      │
      └── Revision
⏱️ Focus Sessions

StudyArc supports focused study sessions.

A focus session allows users to dedicate a specific amount of time to
studying without unnecessary distractions.

Focus functionality can be used to:

Start a study session
Focus on a specific task
Track study duration
Complete focused work
Record study activity
Build consistent study habits

The basic workflow is:

Select Task
     ↓
Start Focus Session
     ↓
Study
     ↓
Complete Session
     ↓
Record Activity
     ↓
Update Productivity
📊 Productivity Tracking

StudyArc tracks study activity to help users understand their productivity.

Productivity information can include:

Study duration
Completed tasks
Focus sessions
Daily study activity
Historical study activity
Overall productivity

The collected information can be used to identify productive study patterns.

📈 Study History

StudyArc provides historical visibility into study activity.

Users can review information such as:

Previous study sessions
Completed tasks
Study duration
Productivity activity
Historical progress

The purpose of study history is to help users understand how consistently
they are studying over time.

📊 Productivity Analytics

StudyArc provides analytics to visualize study performance.

Analytics can include:

Total study time
Completed tasks
Focus session activity
Daily productivity
Weekly productivity
Study consistency
Productivity trends

Example:

Study Activity

Monday       ███████
Tuesday      █████
Wednesday    █████████
Thursday     ████
Friday       ████████
Saturday     ██████████
Sunday       ██████

Analytics allow users to identify:

Strong study days
Weak study days
Productivity patterns
Study consistency
Areas for improvement
🤖 AI-Powered Study Assistance

StudyArc integrates AI functionality using the Google Gemini API.

The AI layer is designed to provide intelligent study assistance.

Potential capabilities include:

Study recommendations
Personalized study guidance
Learning assistance
Productivity suggestions
Study planning
Academic assistance
Intelligent recommendations

The AI functionality depends on a configured Gemini API key.

🧠 AI Study Workflow

The general AI workflow is:

Student Input
      │
      ▼
Study Context
      │
      ▼
Gemini AI
      │
      ▼
Personalized Response
      │
      ▼
Student

The long-term goal is to make StudyArc more adaptive to individual student
needs rather than providing a one-size-fits-all study workflow.

🗄️ Database

StudyArc uses MongoDB for persistent data storage.

The backend connects to MongoDB using the configured MongoDB connection
string.

Local development database:

mongodb://127.0.0.1:27017/focusnest

The database is used to persist application data including user-related
information and study activity.

💾 Data Persistence

The application follows a persistent data flow:

User Action
     ↓
React Frontend
     ↓
Express API
     ↓
MongoDB
     ↓
Stored Study Data
     ↓
API Response
     ↓
React Frontend

This allows study information to remain available between application
sessions.

🔌 Backend API

StudyArc uses a Node.js and Express REST API backend.

The backend application is started through:

backend/server.js

The main API base URL during local development is:

http://localhost:5001/api
❤️ Health Check

The backend provides a health-check endpoint:

GET /api/health

Complete local URL:

http://localhost:5001/api/health

The health endpoint can be used to verify that the backend is running.

Example:

curl http://localhost:5001/api/health
🔗 Frontend-to-Backend Integration

The React frontend communicates with the backend through a centralized API
client.

Frontend API client:

frontend/src/api/client.js

Current local API configuration:

const BASE_URL = 'http://localhost:5001/api';

The application follows:

React Frontend
      │
      │ HTTP Requests
      ▼
Express Backend
      │
      ▼
MongoDB

This keeps frontend UI logic separated from backend business logic and
database operations.

🏗️ System Architecture

StudyArc follows a client-server architecture.

                         ┌─────────────────┐
                         │      USER       │
                         └────────┬────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │     REACT       │
                         │    FRONTEND     │
                         │   + VITE        │
                         └────────┬────────┘
                                  │
                              REST API
                                  │
                                  ▼
                         ┌─────────────────┐
                         │    NODE.JS      │
                         │    EXPRESS      │
                         │     BACKEND     │
                         └────────┬────────┘
                                  │
                 ┌────────────────┼────────────────┐
                 │                │                │
                 ▼                ▼                ▼
           ┌──────────┐    ┌────────────┐   ┌────────────┐
           │ MongoDB  │    │  Firebase  │   │  Gemini AI │
           │ Database │    │    Auth    │   │    API     │
           └──────────┘    └────────────┘   └────────────┘
🔄 End-to-End Application Flow
User
 │
 ▼
StudyArc Frontend
 │
 ├── Login / Registration
 │
 ├── Dashboard
 │
 ├── Study Tasks
 │
 ├── Focus Sessions
 │
 ├── Study History
 │
 ├── Productivity Analytics
 │
 ├── Profile
 │
 └── AI Assistance
 │
 ▼
Express REST API
 │
 ├── Authentication
 ├── User Management
 ├── Study Data
 ├── Focus Activity
 └── Analytics
 │
 ▼
MongoDB
 │
 └── Persistent Study Data
📂 Project Structure
StudyArc/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── ...
│   │
│   ├── server.js
│   ├── package.json
│   ├── package-lock.json
│   ├── .env
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── ...
│   │
│   ├── public/
│   ├── package.json
│   ├── package-lock.json
│   └── ...
│
├── README.md
└── .gitignore
🛠️ Tech Stack
Layer	Technology
Frontend	React.js
Build Tool	Vite
Language	JavaScript / JSX
Styling	CSS
Backend	Node.js
API Framework	Express.js
Database	MongoDB
Database Interaction	Mongoose
Authentication	Firebase / JWT support
AI	Google Gemini API
API Communication	Fetch API
Package Manager	npm
Version Control	Git
Repository	GitHub
⚙️ Backend Setup

Navigate to the backend:

cd backend

Install dependencies:

npm install
🔐 Backend Environment Variables

Create a .env file inside the backend directory.

Example:

PORT=5001
NODE_ENV=development

CLIENT_URL=http://localhost:5173

MONGODB_URI=mongodb://127.0.0.1:27017/focusnest

FIREBASE_SERVICE_ACCOUNT_PATH=

FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=

ALLOW_DEV_AUTH=true

GEMINI_API_KEY=
⚠️ Environment Security

Never commit the following information to GitHub:

.env
API keys
Database passwords
Firebase private keys
Service account credentials
Authentication secrets

Use .env.example for sharing configuration structure.

Example:

PORT=5001
NODE_ENV=development
CLIENT_URL=http://localhost:5173

MONGODB_URI=mongodb://127.0.0.1:27017/focusnest

FIREBASE_SERVICE_ACCOUNT_PATH=
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=

ALLOW_DEV_AUTH=true

GEMINI_API_KEY=
🍃 MongoDB Setup

StudyArc requires MongoDB for local development.

If MongoDB is installed through Homebrew:

brew services start mongodb-community

Verify that MongoDB is running:

lsof -nP -iTCP:27017 -sTCP:LISTEN

Expected local MongoDB address:

127.0.0.1:27017
▶️ Start Backend

From the backend directory:

npm start

The backend will run on:

http://localhost:5001

Health check:

http://localhost:5001/api/health

Expected startup output:

🚀 FocusNest Backend running in development mode on port 5001
📡 Health Check URL: http://localhost:5001/api/health
🎨 Frontend Setup

Open a new terminal.

Navigate to:

cd frontend

Install dependencies:

npm install
▶️ Start Frontend

Run:

npm run dev

Vite will normally start the frontend at:

http://localhost:5173

Open the URL in a browser.

🔄 Complete Local Development Setup

StudyArc requires MongoDB, backend and frontend.

Terminal 1 — MongoDB
brew services start mongodb-community
Terminal 2 — Backend
cd ~/StudyArc/backend
npm start

Backend:

http://localhost:5001
Terminal 3 — Frontend
cd ~/StudyArc/frontend
npm run dev

Frontend:

http://localhost:5173
📌 Local Development Ports
Service	Port	URL
Frontend	5173	http://localhost:5173
Backend	5001	http://localhost:5001
Backend API	5001	http://localhost:5001/api
MongoDB	27017	mongodb://127.0.0.1:27017
🧪 API Testing

Backend health can be tested with:

curl http://localhost:5001/api/health

The API can also be tested through browser/API testing tools such as:

Postman
Thunder Client
Browser
curl
🧪 Local Verification

The local development environment has been configured and verified for:

 MongoDB installation
 MongoDB running locally
 Backend dependency installation
 Backend startup
 MongoDB connection
 Backend health endpoint
 Frontend dependency installation
 Frontend API configuration
 Frontend/backend port configuration
 Git repository setup
 Project committed to Git
⚠️ Common Issues
MongoDB Connection Refused

If the backend displays:

ECONNREFUSED 127.0.0.1:27017

start MongoDB:

brew services start mongodb-community

Then verify:

lsof -nP -iTCP:27017 -sTCP:LISTEN
⚠️ Backend Port Already in Use

If you see:

EADDRINUSE

check whether another application is already using port 5001:

lsof -nP -iTCP:5001 -sTCP:LISTEN

If the StudyArc backend is already running, do not start another backend
instance.

⚠️ Frontend Vite Permission Error

If you see:

vite: Permission denied

perform a clean dependency installation:

cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
⚠️ Rolldown Native Binding Error

If Vite reports an error similar to:

Cannot find native binding

try:

cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev

If the issue continues, verify the Node.js version and dependency
compatibility.

🔐 Authentication Architecture

The authentication architecture follows:

User
 │
 ▼
React Login / Signup
 │
 ▼
Authentication Context
 │
 ▼
Backend Authentication API
 │
 ▼
Firebase / JWT Authentication
 │
 ▼
Authenticated User
 │
 ▼
StudyArc Application

Authentication state is managed on the frontend while backend APIs handle
server-side application operations.

🤖 AI Architecture

The AI-assisted workflow follows:

Student
   │
   ▼
Study Question / Study Context
   │
   ▼
StudyArc Backend
   │
   ▼
Gemini API
   │
   ▼
AI Generated Guidance
   │
   ▼
Student

The AI functionality requires:

GEMINI_API_KEY=

to be configured.

📊 Productivity Architecture

StudyArc's productivity workflow can be represented as:

Study Task
    │
    ▼
Focus Session
    │
    ▼
Study Duration
    │
    ▼
Activity Record
    │
    ▼
Study History
    │
    ▼
Analytics
    │
    ▼
Productivity Insights

This creates a feedback loop where users can use historical productivity
information to improve future study planning.

🧩 Application Modules

StudyArc is organized around several major modules:

Authentication
      │
      ├── Login
      ├── Registration
      └── User Session
      │
      ▼
Dashboard
      │
      ├── Productivity Summary
      ├── Study Activity
      └── Progress
      │
      ▼
Study Management
      │
      ├── Tasks
      ├── Study Planning
      └── Focus Sessions
      │
      ▼
History
      │
      └── Previous Study Activity
      │
      ▼
Analytics
      │
      ├── Productivity
      ├── Study Time
      └── Progress
      │
      ▼
AI Assistant
      │
      └── Personalized Study Support
🌐 Frontend Architecture

The frontend follows a component-based React architecture.

React Application
      │
      ├── Pages
      │
      ├── Components
      │
      ├── Context
      │
      ├── API Client
      │
      └── Styling

The API client centralizes communication with the backend.

Current API base URL:

http://localhost:5001/api
🗃️ Backend Architecture

The backend is organized into application layers.

Express Server
      │
      ▼
Routes
      │
      ▼
Controllers
      │
      ▼
Services / Business Logic
      │
      ▼
Models
      │
      ▼
MongoDB

Configuration and external service integrations are maintained separately
from application routes and business logic.

🔧 Development Workflow

Clone the repository:

git clone https://github.com/sukanyabeuria/StudyArc.git

Enter the repository:

cd StudyArc

Install backend dependencies:

cd backend
npm install

Install frontend dependencies:

cd ../frontend
npm install

Run the application using separate terminals.

🌿 Git Workflow

Create a feature branch:

git checkout -b feature/feature-name

Example:

git checkout -b feature/study-analytics

Check changes:

git status

Stage changes:

git add .

Commit changes:

git commit -m "Add study analytics"

Push the branch:

git push origin feature/study-analytics
📦 Production Build

Frontend production build:

cd frontend
npm run build

The production output is generated by Vite.

The build output is normally:

frontend/dist/
🚀 Production Deployment

StudyArc can be deployed using a modern full-stack architecture.

Recommended architecture:

Frontend
   │
   ▼
Vercel / Netlify
   │
   │ HTTPS API
   ▼
Backend
   │
   ▼
Render / Railway
   │
   ├──────────────► MongoDB Atlas
   │
   ├──────────────► Firebase
   │
   └──────────────► Gemini API
☁️ Suggested Production Stack
Component	Suggested Platform
Frontend	Vercel / Netlify
Backend	Render / Railway
Database	MongoDB Atlas
Authentication	Firebase
AI	Google Gemini
Repository	GitHub
🔐 Production Environment

Before deployment, configure production environment variables.

Example:

PORT=5001
NODE_ENV=production

CLIENT_URL=<production-frontend-url>

MONGODB_URI=<mongodb-atlas-connection-string>

FIREBASE_SERVICE_ACCOUNT_PATH=
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=

ALLOW_DEV_AUTH=false

GEMINI_API_KEY=<production-gemini-key>

Production secrets must be configured through the hosting platform's secret
or environment-variable management system.

🚨 Production Security Checklist

Before production deployment:

 Disable development authentication
 Configure secure authentication
 Configure production MongoDB
 Configure production CORS
 Configure production frontend URL
 Configure Gemini API key
 Configure Firebase credentials
 Verify secrets are not committed
 Verify .env is ignored
 Enable HTTPS
 Test authentication
 Test API endpoints
 Test database persistence
 Test AI functionality
 Test frontend production build
 Test mobile responsiveness
 Monitor backend logs
📈 Future Enhancements

Potential future improvements include:

📅 Advanced study planner
🔔 Smart study reminders
🔥 Study streak tracking
🏆 Achievement badges
🎯 Personalized study goals
📚 Subject-wise progress
🤝 Collaborative study rooms
👥 Group study functionality
🤖 More advanced AI study planning
🧠 Personalized learning recommendations
📊 Advanced productivity analytics
📱 Progressive Web App support
🌙 Improved dark mode
🔔 Push notifications
📈 Long-term performance predictions
🗓️ Calendar integration
☁️ Cloud synchronization
🎯 Project Goals

StudyArc aims to help students:

Organize their academic workload
Create structured study plans
Maintain focused study sessions
Track their study activity
Understand their productivity
Build consistent study habits
Receive personalized AI assistance
Improve their overall learning efficiency
🏆 Hackathon Value Proposition

StudyArc combines productivity + education + AI into a single platform.

The key differentiator is the integration of:

Study Planning
      +
Task Management
      +
Focus Tracking
      +
Productivity Analytics
      +
AI Assistance
      =
Smart Study Ecosystem

Instead of simply acting as a task manager, StudyArc is designed to become a
student's complete digital study companion.

📊 Impact

StudyArc can help students:

Before StudyArc
Multiple Apps
     │
     ├── Notes
     ├── To-Do Lists
     ├── Timers
     ├── Spreadsheets
     └── AI Tools
With StudyArc
              ┌───────────────┐
              │   StudyArc    │
              └───────┬───────┘
                      │
       ┌──────────────┼──────────────┐
       │              │              │
       ▼              ▼              ▼
    Planning        Focus        Analytics
       │              │              │
       └──────────────┼──────────────┘
                      │
                      ▼
                  AI Support

This creates a single centralized environment for managing and improving the
study process.

🧪 Development Status
Completed
 Project repository setup
 React frontend
 Vite development environment
 Node.js backend
 Express API
 MongoDB integration
 Local MongoDB configuration
 Backend environment configuration
 Frontend API configuration
 Backend health check
 Authentication architecture
 Study task functionality
 Focus session functionality
 Study activity tracking
 Study history
 Productivity analytics
 User profile functionality
 Gemini AI integration structure
 Frontend/backend integration
 Git repository integration
⏳ Remaining Work
Production Deployment
 Configure production hosting
 Configure MongoDB Atlas
 Configure production environment variables
 Configure production CORS
 Configure Firebase production authentication
 Configure Gemini production API key
 Deploy backend
 Deploy frontend
 Verify production API communication
 Run production smoke tests
 Verify authentication in production
 Verify database persistence
 Verify AI functionality
 Monitor production logs
🧪 Final Testing Checklist

Before final submission:

 User can register
 User can login
 User can logout
 User session persists
 Dashboard loads correctly
 Study tasks can be managed
 Focus sessions work
 Study activity is recorded
 History displays correctly
 Analytics display correctly
 User profile works
 AI assistant responds correctly
 Backend API responds correctly
 MongoDB persists data
 Frontend production build succeeds
 No API errors in browser console
 No unexpected 401 errors
 No unexpected 404 errors
 No unexpected 500 errors
 Responsive UI verified
 Production deployment verified
📌 Current Status

StudyArc has progressed from a project prototype into a full-stack AI-powered
study and productivity platform.

Current architecture:

React + Vite
      +
Node.js + Express
      +
MongoDB
      +
Authentication
      +
Gemini AI
      +
Study Task Management
      +
Focus Sessions
      +
Study History
      +
Productivity Analytics

The application is configured for local development with:

Frontend → http://localhost:5173
Backend  → http://localhost:5001
API      → http://localhost:5001/api
MongoDB  → mongodb://127.0.0.1:27017

The next major phase is:

Local Development
       ↓
Production Configuration
       ↓
Cloud Database
       ↓
Backend Deployment
       ↓
Frontend Deployment
       ↓
Production Testing
       ↓
Final Hackathon Release
👥 Team

StudyArc is developed as a collaborative student/hackathon project.

Contributors
Sukanya Beuria
Nandini Mishra
Subhasis Mohanty
📄 License

This project is developed for educational, hackathon, and demonstration
purposes.

An appropriate open-source license can be added before public distribution.

⭐ Acknowledgements

StudyArc is built using:

React
Vite
Node.js
Express.js
MongoDB
Firebase
Google Gemini
GitHub
📬 Repository

GitHub:

https://github.com/sukanyabeuria/StudyArc
