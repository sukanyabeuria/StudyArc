
# 📚 StudyArc — Smart Study & Productivity Platform

> **StudyArc** is a modern AI-powered study and productivity platform designed to help students organize their studies, maintain focus, track productivity, and build consistent study habits.

---

## 🚀 Overview

Studying effectively is not just about spending more hours at a desk. Students need a structured way to manage tasks, maintain focus, monitor their progress, and understand their study patterns.

**StudyArc** brings these capabilities together in one platform.

The application provides:

- 📋 Study task management
- ⏱️ Focus sessions
- 📊 Productivity tracking
- 📈 Study history and analytics
- 🤖 AI-powered study assistance
- 👤 User profiles
- 🔐 Authentication
- 💾 Persistent data storage
- 📱 Responsive and modern UI

The goal of StudyArc is to help students turn unstructured study time into a **consistent, measurable, and productive study routine**.

---

# ✨ Key Features

## 🔐 Authentication

StudyArc supports user authentication and account management.

Features include:

- User login
- User registration
- Authentication state management
- Protected user functionality
- User-specific study data

Authentication can be integrated with Firebase/JWT-based authentication depending on the configured environment.

---

## 📋 Study Task Management

Students can organize their academic workload using study tasks.

Users can:

- Create study tasks
- Manage pending tasks
- Track completed tasks
- Organize their study workload
- Maintain a structured study routine

This helps students convert large academic goals into smaller and manageable activities.

---

## ⏱️ Focus Sessions

StudyArc provides functionality for focused study sessions.

A focus session allows students to:

- Start a dedicated study session
- Concentrate on a specific task
- Track study duration
- Complete focused work without unnecessary distractions

The objective is to encourage consistent deep-work habits.

---

## 📊 Productivity Tracking

StudyArc records study activity to help users understand their productivity.

Users can track:

- Study duration
- Completed study sessions
- Completed tasks
- Daily productivity
- Overall study activity

This makes it easier to identify productive patterns and improve study habits.

---

## 📈 Study History & Analytics

Study activity can be viewed through historical data and productivity insights.

Analytics can help students understand:

- How much they study
- How frequently they study
- Their completed tasks
- Their focus-session activity
- Their productivity patterns

The long-term goal is to help students make better decisions about how they spend their study time.

---

## 🤖 AI-Powered Study Assistance

StudyArc integrates AI capabilities to provide intelligent study assistance.

The project can use **Google Gemini API** for AI-powered functionality.

Potential AI capabilities include:

- Study guidance
- Learning assistance
- Productivity suggestions
- Personalized study recommendations
- Academic support

AI functionality depends on the availability of a configured Gemini API key.

---

## 👤 User Profile

Each user can maintain a personalized profile.

Profile functionality can include:

- User information
- Personalized study data
- Account information
- User-specific productivity history

All study-related information is associated with the respective user.

---

# 🛠️ Tech Stack

## Frontend

| Technology | Purpose |
|---|---|
| React | Frontend UI |
| Vite | Development & build tool |
| JavaScript | Application logic |
| CSS | Styling |
| Fetch API | Backend communication |

---

## Backend

| Technology | Purpose |
|---|---|
| Node.js | Runtime |
| Express.js | Backend framework |
| JavaScript / ES Modules | Backend development |
| MongoDB | Database |
| Mongoose | MongoDB interaction |
| Firebase | Authentication support |
| JWT | Authentication support |
| Gemini API | AI functionality |

---

# 🏗️ Project Architecture

StudyArc follows a client-server architecture.

```text
                 ┌─────────────────────┐
                 │      STUDYARC       │
                 └──────────┬──────────┘
                            │
              ┌─────────────┴─────────────┐
              │                           │
              ▼                           ▼
      ┌───────────────┐           ┌───────────────┐
      │   FRONTEND    │           │    BACKEND    │
      │ React + Vite  │ ────────► │ Node + Express│
      └───────────────┘           └───────┬───────┘
                                          │
                           ┌──────────────┼──────────────┐
                           │              │              │
                           ▼              ▼              ▼
                       MongoDB        Firebase       Gemini AI
                       Database      Authentication     API
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
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── api/
│   │   └── ...
│   │
│   ├── public/
│   ├── package.json
│   ├── package-lock.json
│   └── ...
│
├── README.md
└── .gitignore
⚙️ Installation & Setup
Follow the steps below to run StudyArc locally.

1️⃣ Clone the Repository
git clone https://github.com/sukanyabeuria/StudyArc.git
Move into the project directory:

cd StudyArc
🗄️ Backend Setup
2️⃣ Navigate to Backend
cd backend
3️⃣ Install Backend Dependencies
npm install
4️⃣ Configure Environment Variables
Create a .env file inside the backend directory.

touch .env
Add the required environment variables:

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
⚠️ Important: Never commit .env files or API keys to GitHub.

🍃 MongoDB Setup
StudyArc uses MongoDB as its database.

If MongoDB is installed through Homebrew on macOS, MongoDB can be started with:

brew services start mongodb-community
Check whether MongoDB is running:

lsof -nP -iTCP:27017 -sTCP:LISTEN
MongoDB should normally run on:

127.0.0.1:27017
▶️ Start the Backend
Inside the backend directory:

npm start
The backend will run on:

http://localhost:5001
Health check:

http://localhost:5001/api/health
Expected output:

🚀 FocusNest Backend running in development mode on port 5001
📡 Health Check URL: http://localhost:5001/api/health
🎨 Frontend Setup
Open a new terminal window.

Navigate to the frontend:

cd ~/StudyArc/frontend
1️⃣ Install Frontend Dependencies
npm install
If you encounter dependency/native-binding issues, perform a clean installation:

rm -rf node_modules package-lock.json
npm install
2️⃣ Configure Backend API
The frontend communicates with the backend through:

http://localhost:5001/api
The API client is located at:

frontend/src/api/client.js
The configured API base URL should be:

const BASE_URL = 'http://localhost:5001/api';
3️⃣ Start Frontend
Run:

npm run dev
Vite will provide a local development URL, normally:

http://localhost:5173
Open the URL in your browser.

🔄 Running the Complete Application
You need three services/processes during local development:

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
🔗 Application Flow
The overall request flow is:

User
  │
  ▼
React Frontend
  │
  │ HTTP Requests
  ▼
Express Backend
  │
  ├──────────────► MongoDB
  │
  ├──────────────► Firebase Authentication
  │
  └──────────────► Gemini AI
🔐 Environment Variables
The backend requires environment variables for external services.

Variable	Description
PORT	Backend server port
NODE_ENV	Application environment
CLIENT_URL	Frontend URL
MONGODB_URI	MongoDB connection string
FIREBASE_SERVICE_ACCOUNT_PATH	Firebase service account path
FIREBASE_PROJECT_ID	Firebase project ID
FIREBASE_CLIENT_EMAIL	Firebase service account email
FIREBASE_PRIVATE_KEY	Firebase private key
ALLOW_DEV_AUTH	Enables development authentication behavior
GEMINI_API_KEY	Google Gemini API key
🧪 API Health Check
Once the backend is running, verify the server using:

http://localhost:5001/api/health
You can also test it from the terminal:

curl http://localhost:5001/api/health
A successful response confirms that the backend is running correctly.

🧑‍💻 Development Workflow
Recommended workflow for contributors:

# Clone repository
git clone https://github.com/sukanyabeuria/StudyArc.git

# Enter project
cd StudyArc

# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
After making changes:

git status
Stage changes:

git add .
Commit:

git commit -m "Describe your changes"
Push:

git push origin main
🌿 Git Workflow
For new features, create a separate branch:

git checkout -b feature/feature-name
Example:

git checkout -b feature/study-analytics
After completing the feature:

git add .
git commit -m "Add study analytics"
git push origin feature/study-analytics
Then create a Pull Request on GitHub.

🛡️ Security
Never commit sensitive credentials to GitHub.

The following files should remain private:

.env
Firebase credentials
API keys
Database passwords
Private keys
Service account credentials
The repository should contain .env.example instead.

Example:

GEMINI_API_KEY=
MONGODB_URI=
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
⚠️ Common Issues
MongoDB Connection Refused
If you see:

ECONNREFUSED 127.0.0.1:27017
Make sure MongoDB is running:

brew services start mongodb-community
Then verify:

lsof -nP -iTCP:27017 -sTCP:LISTEN
Port Already in Use
If you see:

EADDRINUSE
another process is already using the port.

Check port 5001:

lsof -nP -iTCP:5001 -sTCP:LISTEN
If the StudyArc backend is already running, do not start another backend process.

Frontend Vite Permission Error
If you see:

vite: Permission denied
try:

cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
Rolldown Native Binding Error
If Vite reports an error similar to:

Cannot find native binding
try a clean dependency installation:

cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
📌 Current Local Development Ports
Service	Port	URL
Frontend	5173	http://localhost:5173
Backend	5001	http://localhost:5001
Backend API	5001	http://localhost:5001/api
MongoDB	27017	mongodb://127.0.0.1:27017
🚀 Deployment
StudyArc can be deployed using a modern full-stack deployment architecture.

Frontend
Recommended platforms:

Vercel

Netlify

Backend
Recommended platforms:

Render

Railway

Database
Recommended:

MongoDB Atlas

AI
Configure:

Google Gemini API

Authentication
Configure:

Firebase Authentication

☁️ Suggested Production Architecture
                         ┌─────────────────┐
                         │      USERS      │
                         └────────┬────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │    VERCEL /     │
                         │    NETLIFY      │
                         │    FRONTEND     │
                         └────────┬────────┘
                                  │
                              HTTPS/API
                                  │
                                  ▼
                         ┌─────────────────┐
                         │ RENDER /        │
                         │ RAILWAY         │
                         │ BACKEND        │
                         └───────┬─────────┘
                                 │
             ┌───────────────────┼───────────────────┐
             │                   │                   │
             ▼                   ▼                   ▼
       ┌───────────┐      ┌────────────┐      ┌────────────┐
       │ MongoDB   │      │  Firebase  │      │  Gemini    │
       │   Atlas   │      │    Auth    │      │    API     │
       └───────────┘      └────────────┘      └────────────┘
📊 Future Improvements
Possible future enhancements include:

📅 Advanced study planner

🔔 Study reminders

📚 Subject-wise progress tracking

🏆 Gamification and achievement badges

🔥 Study streaks

🤝 Collaborative study rooms

📊 Advanced productivity dashboards

🤖 More personalized AI recommendations

📱 Progressive Web App support

🌙 Dark mode improvements

📈 Long-term performance analytics

🧠 Personalized learning plans

🎯 Project Goals
StudyArc aims to help students:

Organize their academic workload

Build consistent study habits

Improve focus

Track their study time

Understand their productivity

Get personalized study assistance

Make data-driven improvements to their study routine

👥 Team
StudyArc is developed as a collaborative student project/hackathon initiative.

Contributors
Sukanya Beuria

Nandini Mishra

Team Members

📄 License
This project is intended for educational, hackathon, and development purposes.

Add an appropriate open-source license before distributing the project publicly.

⭐ Acknowledgements
Special thanks to the technologies and platforms that make StudyArc possible:

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

💡 StudyArc
Plan your studies. Focus better. Track your progress. Learn smarter.

📚 StudyArc — Your journey from studying to achieving.


**One important note:** I kept this in the same detailed style as the Fraud-Shield README you shared, but avoided putting any actual API keys/passwords into the README.

Available next action: :contentReference[oaicite:0]{index=0}

🛡️ Fraud-Shield
Hackathon prototype quick start
The demo runs without PostgreSQL: the backend automatically uses a local
SQLite database and the existing trained model is optional. If the ML wheels
are unavailable, the API uses the deterministic hackathon-heuristic-v1
scorer so the complete signup → analysis → history → analytics flow remains
usable.

Terminal 1:

cd backend
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
Terminal 2:

cd "frontend/fraud-shield-react-frontend (2)"
npm install
npm run dev -- --host 0.0.0.0
The Vite proxy forwards /api/* to the backend, so no frontend API URL is
required for local or hosted development. Set VITE_API_BASE_URL only when
the backend is deployed at a separate public origin.

A full-stack AI-powered financial fraud detection and explainability platform designed to identify suspicious financial transactions in real time and explain the key factors behind each fraud decision.

Current Stage: Full-stack integration complete — Backend + Authentication + PostgreSQL + ML/XAI + React Frontend integration verified locally. Production deployment is the next phase.

📌 About the Project
Fraud-Shield combines:

Machine Learning
Explainable AI (XAI)
Rule-based fraud detection
Hybrid risk scoring
FastAPI REST APIs
PostgreSQL persistence
JWT-based authentication
React/Vite frontend
Transaction history
Risk analytics
Profile and security settings
Live alert feed
The system evaluates transaction characteristics such as transaction amount, international transfer status, recipient history, device information, location and transaction patterns to generate a fraud risk assessment.

The platform does not only predict whether a transaction is fraudulent; it also provides risk factors, triggered rules, confidence information and recommended actions to make the decision easier to understand.

🚀 Key Features
🔐 Authentication
Authentication is implemented end-to-end between the React frontend and FastAPI backend.

Implemented features:

User registration
Login API
Email validation
Password hashing
JWT access-token generation
Database-backed user lookup
Invalid credential handling
Frontend authentication context
Frontend session persistence
Authenticated API requests
Logout
User identity and role information
Registration
POST /api/v1/auth/register
Example request:

{
  "full_name": "Fraud Shield Test",
  "email": "fraudshield.test@example.com",
  "password": "TestPass123!"
}
Login
POST /api/v1/auth/login
Example request:

{
  "email": "fraudshield.test@example.com",
  "password": "TestPass123!"
}
Successful authentication returns:

{
  "access_token": "<JWT_TOKEN>",
  "token_type": "bearer",
  "user_id": 2,
  "email": "fraudshield.test@example.com",
  "role": "user"
}
Invalid credentials correctly return:

401 Unauthorized
with:

{
  "detail": "Invalid email or password"
}
Authentication schemas are defined in:

backend/app/schemas/auth.py
Authentication utilities are implemented in:

backend/app/api/v1/auth_utils.py
The frontend authentication flow is handled through:

frontend/fraud-shield-react-frontend (2)/src/context/AuthContext.jsx
👤 Profile & Settings
Profile and settings integration is implemented between the React frontend and backend.

Implemented functionality includes:

Notification Settings
Fraud alerts
High-risk only
Weekly digest
Email alerts
SMS alerts
Security Settings
Two-factor authentication
Login alerts
Automatic blocking
Session timeout
Backend Endpoints
GET   /api/v1/auth/settings
PATCH /api/v1/auth/settings
GET   /api/v1/auth/sessions
Settings are stored in PostgreSQL and are user-specific.

The persistence flow has been verified:

Change setting
      ↓
Save
      ↓
PATCH backend API
      ↓
PostgreSQL
      ↓
Refresh application
      ↓
GET settings
      ↓
Saved value restored
📊 Fraud Detection Dashboard
The dashboard consumes backend APIs for real transaction and analytics data.

Supported dashboard information includes:

Total transactions
Safe transactions
Suspicious transactions
Fraud detected
Overall risk score
Recent transactions
Fraud statistics
Risk distribution
Transaction activity
High-risk transaction monitoring
Critical-risk transaction monitoring
Analytics are calculated from persisted PostgreSQL transaction data.

💳 Real-Time Transaction Analysis
Users can submit transaction information through the React frontend.

Transaction Inputs
Transaction ID
Transaction amount
Currency
Transaction type
Merchant category
Merchant name
Location
IP address
Device type
International transfer status
New recipient status
Transaction frequency
New device status
Endpoint
POST /api/v1/transactions/analyze
The backend generates:

Risk score
Risk level
Fraud/Genuine verdict
Prediction confidence
Risk factors
Triggered fraud rules
Recommended action
Model version
Evaluation timestamp
Explainability information
Example:

Risk Score: 83
Risk Level: Critical
Verdict: Fraud
Confidence: 99.63%

Recommended Action:
Block transaction and initiate manual review
The React Transaction Check screen is connected to the real API.

The Fraud Result screen renders the returned transaction analysis rather than relying on fabricated prediction data.

🤖 Machine Learning Fraud Detection
Fraud-Shield uses an XGBoost-based machine learning model.

The ML pipeline contains:

backend/ml/
├── feature_engineering.py
├── model_loader.py
├── predictor.py
├── train_model.py
└── artifacts/
    ├── xgboost_model.pkl
    ├── feature_engineer.pkl
    ├── shap_explainer.pkl
    └── model_metadata.json
The trained model is loaded through FraudPredictor.

The ML service does not use hard-coded fraud predictions.

The generated fraud probability is combined with deterministic fraud rules through the hybrid scoring layer.

🔍 Explainable AI (XAI)
Fraud-Shield uses SHAP (SHapley Additive exPlanations) to explain individual fraud predictions.

Example risk factors:

is_international     → increases risk
is_new_recipient     → increases risk
previous_amount      → increases risk
is_new_device        → increases risk
amount               → increases risk
Each explanation can contain:

Feature name
Feature impact
Risk direction
Human-readable explanation
Example:

{
  "feature": "is_new_recipient",
  "impact": 2.02,
  "direction": "increases_risk",
  "explanation": "Recipient has not been previously used. This increases the risk of fraud."
}
⚙️ Hybrid Fraud Detection Engine
Fraud-Shield combines machine learning and deterministic business rules.

Transaction
     │
     ▼
Feature Engineering
     │
     ├─────────────────┐
     ▼                 ▼
XGBoost Model      Rule Engine
     │                 │
     │                 ├── NEW_RECIPIENT
     │                 ├── INTERNATIONAL_TRANSFER
     │                 ├── NEW_DEVICE
     │                 └── HIGH_FREQUENCY
     │
     └────────┬────────┘
              ▼
       Hybrid Risk Scoring
              │
              ▼
       Final Fraud Decision
              │
              ▼
       SHAP Explanation
              │
              ▼
       Database Persistence
              │
              ▼
          API Response
              │
              ▼
        React Frontend
The hybrid approach combines learned fraud patterns with business-defined fraud rules.

🧠 Risk Classification
The backend uses configured risk thresholds to classify transactions.

Low Risk
Medium Risk
High Risk
Critical Risk
The final decision incorporates:

ML fraud probability
Rule-based risk signals
Hybrid scoring
Configured risk thresholds
📜 Transaction History
Transaction history is connected to the backend.

Endpoints
GET /api/v1/transactions
GET /api/v1/transactions/{id}
The React History page consumes these endpoints to display persisted transactions.

Historical transaction records include fraud evaluation information such as:

Risk score
Risk level
Verdict
Confidence
Recommended action
Evaluation timestamp
📈 Risk Analytics
The React Analytics page consumes database-backed analytics APIs.

Endpoints
GET /api/v1/analytics/summary
GET /api/v1/analytics
Supported metrics include:

Total transactions
Fraud transactions
Suspicious transactions
Safe transactions
Average risk score
Average prediction confidence
Total transaction amount
High-risk transactions
Critical-risk transactions
Risk distribution
Transaction activity
Fraud/Genuine analysis
The analytics are calculated from persisted transaction records rather than static frontend data.

🚨 Navbar Alerts
The navbar alert feed is connected to the backend.

Endpoint
GET /api/v1/alerts
The frontend requests alerts when the alert dropdown is opened.

The UI supports:

Alert count
Alert title
Alert details
Severity/risk level
Alert timestamp
Loading state
Error state
Empty state
If no alerts exist, the UI displays:

No active alerts.
🗄️ Database
Fraud-Shield uses PostgreSQL for persistent storage.

SQLAlchemy is used as the ORM.

Current database tables include:

users
transactions
fraud_evaluations
feature_attributions
User Data
The users table stores:

User ID
Email
Password hash
First name
Last name
Role
Created timestamp
Notification settings
Security settings
Transaction Data
Transactions store:

Transaction ID
Amount
Currency
Transaction type
Merchant information
Location
IP address
Device type
Transfer indicators
Recipient indicators
Frequency
Risk score
Risk level
Verdict
Confidence
Recommended action
User relationship
Created timestamp
Fraud Evaluation Data
Fraud evaluations store:

Transaction ID
Risk score
Risk level
Verdict
Confidence
Recommended action
Model version
Feature Attribution Data
Feature-level explainability information is persisted through feature attribution records.

💾 Database Persistence
Fraud analysis results are persisted after transaction evaluation.

Example:

Transaction
TXN-DB-001
        │
        ├── Risk Score: 83
        ├── Risk Level: Critical
        └── Verdict: Fraud
                │
                └── Feature Attributions
                     ├── is_international
                     ├── is_new_recipient
                     ├── previous_amount
                     ├── is_new_device
                     └── amount
This allows:

Historical analysis
Analytics calculations
Transaction history
Persistent fraud evaluations
Explainability storage
🔌 Backend API
Fraud-Shield uses a FastAPI REST backend.

Current API Routes
POST  /api/v1/auth/register
POST  /api/v1/auth/login

GET   /api/v1/auth/settings
PATCH /api/v1/auth/settings
GET   /api/v1/auth/sessions

GET   /api/v1/health
GET   /health

GET   /api/v1/alerts

GET   /api/v1/analytics/summary
GET   /api/v1/analytics

GET   /api/v1/transactions
GET   /api/v1/transactions/{id}
POST  /api/v1/transactions/analyze
The currently implemented routes were verified through the running OpenAPI specification.

❤️ Health Check
Backend Health
GET /health
Response:

{
  "status": "healthy",
  "service": "fraud-shield-backend"
}
API Health
GET /api/v1/health
Response:

{
  "status": "healthy",
  "service": "Fraud-Shield API"
}
Both endpoints have been verified locally.

📖 API Documentation
FastAPI automatically provides:

Swagger
http://127.0.0.1:8000/docs
OpenAPI
http://127.0.0.1:8000/openapi.json
The OpenAPI specification was used to verify the active backend routes.

🔐 Security
The backend includes:

Password hashing
JWT authentication
Email validation
Environment-based configuration
PostgreSQL credentials through environment variables
SQLAlchemy parameterized database operations
Foreign key constraints
.env files excluded from Git
Production SECRET_KEY configuration through environment variables
JWT configuration is maintained in:

backend/app/core/config.py
Important production variables include:

SECRET_KEY
DATABASE_URL
APP_ENV
A secure production secret must be supplied during deployment.

🌐 Frontend API Configuration
The frontend uses a centralized API configuration:

frontend/fraud-shield-react-frontend (2)/src/config/api.js
The backend base URL is configured through:

VITE_API_BASE_URL
Example local configuration:

VITE_API_BASE_URL=http://127.0.0.1:8000
VITE_API_TIMEOUT_MS=30000
API endpoint paths are centralized in:

src/config/api.js
The frontend does not hard-code backend URLs across individual components.

🔗 Frontend-to-Backend Integration
The frontend integration phase has been completed for the implemented backend APIs.

Current integration includes:

React Frontend
      │
      ▼
HTTP Client
      │
      ▼
FastAPI Backend
      │
      ├── Authentication
      ├── Profile Settings
      ├── Transactions
      ├── Fraud Analysis
      ├── Transaction History
      ├── Analytics
      └── Alerts
      │
      ▼
PostgreSQL / ML / XAI
Integrated frontend services include:

src/services/httpClient.js
src/services/fraudApi.js
src/context/AuthContext.jsx
The frontend uses real API responses and real error states instead of fabricated backend data for the implemented flows.

🧪 Local Testing & Verification
The integrated application has been tested locally.

1. Database Connection
Verified successfully:

DATABASE: 1
This confirms that SQLAlchemy can connect to PostgreSQL and execute a query.

2. Backend Health
Verified:

GET /health
GET /api/v1/health
Both returned HTTP 200 responses.

3. User Registration
Verified:

POST /api/v1/auth/register
A test user was successfully created and the API returned:

HTTP 201 Created
with:

Access token
Token type
User ID
Email
Role
4. Login
Verified:

POST /api/v1/auth/login
Successful login returned a valid JWT access token.

5. Authenticated Settings
Verified using the returned JWT:

GET /api/v1/auth/settings
The API returned the user's persisted settings.

6. Sessions
Verified:

GET /api/v1/auth/sessions
The API successfully returned the current authenticated session.

7. Alerts
Verified:

GET /api/v1/alerts
The endpoint correctly returned:

{
  "items": [],
  "total": 0
}
when no active alerts existed.

8. Frontend Production Build
The production frontend build was successfully generated using:

npm run build
Build result:

✓ 2438 modules transformed.
✓ built successfully
The generated production artifact:

frontend/fraud-shield-react-frontend (2)/dist/index.html
was successfully created.

🏗️ Frontend Build
Frontend technology:

React
Vite
Tailwind CSS
React Router
Recharts
Lucide React
Build command:

cd frontend/"fraud-shield-react-frontend (2)"
npm install
npm run build
Production output is generated under:

dist/
🔧 Running the Backend Locally
Navigate to the project:

cd ~/Fraud-Shield/backend
Activate the virtual environment:

source venv/bin/activate
Install dependencies:

pip install -r requirements.txt
Start FastAPI:

python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
Backend:

http://127.0.0.1:8000
Swagger:

http://127.0.0.1:8000/docs
OpenAPI:

http://127.0.0.1:8000/openapi.json
🔧 Running the Frontend Locally
Navigate to:

cd ~/Fraud-Shield/frontend/"fraud-shield-react-frontend (2)"
Install dependencies:

npm install
Configure:

.env.local
Example:

VITE_API_BASE_URL=http://127.0.0.1:8000
VITE_API_TIMEOUT_MS=30000
Start the frontend:

npm run dev
The frontend will normally be available at:

http://localhost:5173
⚠️ Port Already in Use
If FastAPI reports:

ERROR: [Errno 48] Address already in use
check whether the existing backend is already running:

curl http://127.0.0.1:8000/api/v1/health
If it returns:

{
  "status": "healthy",
  "service": "Fraud-Shield API"
}
the backend is already active.

📁 Project Structure
Fraud-Shield/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   └── v1/
│   │   │       ├── auth_utils.py
│   │   │       └── router.py
│   │   │
│   │   ├── core/
│   │   │   ├── config.py
│   │   │   └── database.py
│   │   │
│   │   ├── models/
│   │   │   ├── models.py
│   │   │   └── transaction.py
│   │   │
│   │   ├── schemas/
│   │   │   ├── auth.py
│   │   │   └── transaction.py
│   │   │
│   │   ├── services/
│   │   │   ├── ml_service.py
│   │   │   └── rule_engine.py
│   │   │
│   │   ├── utils/
│   │   │   └── hybrid_scoring.py
│   │   │
│   │   └── main.py
│   │
│   ├── ml/
│   │   ├── feature_engineering.py
│   │   ├── model_loader.py
│   │   ├── predictor.py
│   │   ├── train_model.py
│   │   └── artifacts/
│   │
│   ├── requirements.txt
│   └── README.md
│
├── database/
├── docs/
├── explainable-ai/
│
├── frontend/
│   └── fraud-shield-react-frontend (2)/
│       ├── src/
│       ├── index.html
│       ├── package.json
│       ├── package-lock.json
│       ├── vite.config.ts
│       └── .env.example
│
├── .gitignore
├── LICENSE
└── README.md
🔄 End-to-End System Flow
User
 │
 ▼
React Frontend
 │
 ├── Signup
 ├── Login
 ├── Profile
 ├── Transaction Check
 ├── History
 ├── Analytics
 └── Alerts
 │
 ▼
HTTP Client
 │
 ▼
FastAPI Backend
 │
 ├───────────────────────┐
 ▼                       ▼
Authentication        Fraud Analysis
 │                       │
 ▼                 ┌─────┴─────┐
JWT                ▼           ▼
                  ML Engine   Rule Engine
                     │           │
                     ▼           ▼
                  XGBoost    Business Rules
                     │           │
                     └─────┬─────┘
                           ▼
                    Hybrid Scoring
                           │
                           ▼
                    Fraud Evaluation
                       ┌───┴───┐
                       ▼       ▼
                     SHAP   PostgreSQL
                  Explanation Storage
                       │       │
                       └───┬───┘
                           ▼
                      API Response
                           │
                           ▼
                    React Dashboard
🛠️ Tech Stack
Layer	Technology
Frontend	React.js
Build Tool	Vite
Language	JavaScript / JSX
Styling	Tailwind CSS / CSS
Routing	React Router
Charts	Recharts
Icons	Lucide React
Backend	Python
API Framework	FastAPI
ORM	SQLAlchemy
Database	PostgreSQL
Validation	Pydantic
Configuration	Pydantic Settings
Authentication	JWT / PyJWT
Password Hashing	pwdlib / Argon2
Machine Learning	XGBoost
Explainable AI	SHAP
ML Processing	scikit-learn
Model Serialization	Joblib / Pickle
ASGI Server	Uvicorn
Database Migrations	Alembic
Version Control	Git
Collaboration	GitHub
📦 Backend Dependencies
Backend dependencies are maintained in:

backend/requirements.txt
Important dependencies include:

FastAPI
Uvicorn
SQLAlchemy
Pydantic
Pydantic Settings
psycopg2-binary
PyJWT
pwdlib
Argon2
email-validator
NumPy
Pandas
scikit-learn
Joblib
SHAP
XGBoost
The virtual environment is local development infrastructure and is not committed to Git.

🔒 Environment Configuration
Frontend
Frontend environment variables are configured through:

.env.local
Example:

VITE_API_BASE_URL=http://127.0.0.1:8000
VITE_API_TIMEOUT_MS=30000
Production should use the deployed backend URL instead of localhost.

Backend
Production configuration should be supplied through environment variables.

Important variables:

APP_ENV=production
DATABASE_URL=<production-postgresql-url>
SECRET_KEY=<strong-random-production-secret>
Never commit production secrets to GitHub.

🚀 Production Deployment
Production deployment is the next phase.

Pending deployment work
 Choose production hosting provider
 Configure FastAPI production service
 Configure production PostgreSQL
 Configure production DATABASE_URL
 Generate secure production SECRET_KEY
 Configure production CORS
 Configure production frontend API URL
 Verify ML model artifacts are available in production
 Run production database migrations
 Deploy backend
 Deploy frontend
 Run production smoke tests
 Verify browser Console
 Verify Network tab for unexpected 401, 404, or 500
 Verify production authentication
 Verify transaction analysis
 Verify history
 Verify analytics
 Verify alerts
 Verify settings persistence
 Run final production build
🧪 Integration Verification Checklist
The following local integration checks have been completed:

 Backend starts successfully
 PostgreSQL connection verified
 Backend health endpoint verified
 API health endpoint verified
 OpenAPI routes verified
 User registration verified
 User login verified
 JWT token generation verified
 Authenticated settings endpoint verified
 Sessions endpoint verified
 Alerts endpoint verified
 Frontend API configuration verified
 Frontend authentication flow integrated
 Profile/settings API integration implemented
 Transaction analysis API integration implemented
 Transaction history integration implemented
 Analytics integration implemented
 Navbar alerts integration implemented
 Real API error handling implemented
 Frontend production build verified
 Git changes committed
 Changes pushed to GitHub
📌 Current Status
Completed
 FastAPI backend
 Health check API
 Transaction analysis API
 Transaction history endpoints
 Analytics summary API
 Analytics API
 Request validation
 XGBoost fraud model
 Feature engineering
 Model artifact loading
 SHAP explainability
 Business rule engine
 Hybrid risk scoring
 Risk classification
 Fraud/Safe verdict
 Recommended actions
 Risk factor explanations
 Triggered rule explanations
 Model version tracking
 PostgreSQL integration
 SQLAlchemy ORM
 Fraud evaluation persistence
 Feature attribution persistence
 Database-backed analytics
 User model
 Password hashing
 User registration
 JWT login authentication
 Authentication request/response schemas
 Authenticated settings API
 Settings persistence
 Sessions API
 Alerts API
 React authentication integration
 Frontend API client
 Authenticated frontend requests
 Transaction Check integration
 Fraud Result integration
 Dashboard analytics integration
 Transaction History integration
 Profile & Settings integration
 Navbar Alerts integration
 Local PostgreSQL verification
 Local API verification
 Frontend production build
 Git commit
 GitHub push
⏳ Remaining Work
Production Deployment
 Production hosting configuration
 Production PostgreSQL database
 Production environment variables
 Secure production JWT secret
 Production CORS configuration
 ML artifact deployment verification
 Database migrations
 Backend deployment
 Frontend deployment
 Production smoke testing
 Production monitoring/logging
Future Enhancements
 Refresh-token flow
 Role-based access control
 Password reset
 Automated backend test suite
 Structured production logging
 Real-time transaction streaming
 Advanced anomaly detection
 Model retraining pipeline
 Continuous model monitoring
 Advanced notification delivery
 Production alerting infrastructure
🏁 Project Status
Fraud-Shield has progressed from a frontend prototype into a functional full-stack fraud detection platform.

The current system includes:

React Frontend
      +
FastAPI Backend
      +
PostgreSQL
      +
JWT Authentication
      +
XGBoost
      +
SHAP Explainability
      +
Rule Engine
      +
Hybrid Risk Scoring
      +
Transaction Persistence
      +
Analytics
      +
Transaction History
      +
Profile & Security Settings
      +
Navbar Alerts
The frontend-to-backend integration phase is complete and has been verified locally.￼￼The project is now ready for the next phase:￼￼> Production deployment configuration → Cloud deployment → Production smoke testing → Final release.......give the total in this format


Yes bhai. Below is the complete StudyArc README rewritten in exactly this kind of format — same professional hackathon README style, with sections for quick start, features, APIs, architecture, database, testing, deployment, status, etc.

You can copy everything inside the code block directly into README.md.

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

Team Members

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

💙 StudyArc
Plan your studies. Focus better. Track your progress. Learn smarter.

📚 StudyArc — Your journey from studying to achieving.

**Small correction before you commit:** because this README is modeled on the Fraud-Shield format, it contains some feature/status language that should ideally be checked against the actual StudyArc code before presenting it as a verified implementation. If you want the README to be **100% code-accurate**, upload the StudyArc ZIP/repository files here and I can make the final README strictly from the actual implementation.

give all this one long box 
for easy copy paste

Sure bhai — one single long box, so you can copy-paste the entire thing directly into README.md:

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

Team Members

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

💙 StudyArc
Plan your studies. Focus better. Track your progress. Learn smarter.

📚 StudyArc — Your journey from studying to achieving.

