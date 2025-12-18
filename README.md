````markdown
<div align="center">

# 🕵️‍♂️ The Corruptor

**Corruption Education Simulator**

![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.95+-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-4.0+-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

> _"Don't just tell people corruption is bad. Let them feel the weight of the temptation, and the fatality of the consequences."_

[🚀 View Live Demo](#) · [🐛 Report Bug](#) · [✨ Request Feature](#)

</div>

---

## 📖 About The Project

**The Corruptor** is a **Data-Driven Text-Based Simulation Game** that puts users in the shoes of public officials facing real-world moral dilemmas. Using gamification and psychological decision-making mechanics, it demonstrates the "slippery slope" of corruption.

Players must balance three critical metrics:

1.  **💰 Personal Wealth** (Kekayaan Pribadi)
2.  **📢 Public Trust** (Kepercayaan Publik)
3.  **⚖️ Investigation Risk** (Risiko Pidana)

---

## 📂 Project Structure

Based on the current development environment:

```bash
project-root/
│
├── backend/                # Server-side Logic
│   ├── app/
│   │   ├── data/stories/   # JSON Narrative Files (e.g., hayes.json)
│   │   ├── database.py     # DB Connection Logic
│   │   ├── logic.py        # Game Calculation Engine
│   │   ├── main.py         # API Gateway (FastAPI Entry Point)
│   │   └── models.py       # Pydantic Schemas
│   ├── venv/               # Python Virtual Environment
│   ├── requirements.txt    # Python Dependencies
│   └── README.md
│
├── frontend/               # Client-side Application
│   ├── public/             # Static Assets
│   ├── src/
│   │   ├── components/     # React UI Components (HUD, StoryScreen, etc.)
│   │   ├── data/           # API Handlers & Static JS Data
│   │   ├── App.jsx         # Main Router
│   │   └── main.jsx        # React Entry Point
│   ├── index.html          # HTML Root
│   ├── package.json        # Node Dependencies
│   ├── vite.config.js      # Bundler Config
│   └── README.md
│
└── README.md               # This Documentation
```
````

---

## 🚀 Quick Start (Local Development)

Follow these instructions to set up the project on your local machine.

### 1. Backend Setup (The Brain)

Open a terminal and navigate to the `backend` folder.

```bash
# 1. Enter backend directory
cd backend

# 2. Create virtual environment
python -m venv venv

# 3. Activate environment
# For Windows:
venv\Scripts\activate
# For Mac/Linux:
source venv/bin/activate

# 4. Install dependencies
pip install -r requirements.txt

# 5. Run the Server
# Note: We run app.main because main.py is inside the 'app' folder
uvicorn app.main:app --reload

```

_Backend will run at:_ `http://localhost:8000`

### 2. Frontend Setup (The Face)

Open a **new terminal** and navigate to the `frontend` folder.

```bash
# 1. Enter frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. Configure Environment (Optional but recommended)
# Create a .env file inside /frontend folder:
echo "VITE_API_BASE_URL=http://localhost:8000" > .env

# 4. Run the App
npm run dev

```

_Frontend will run at:_ `http://localhost:5173`

---

## 🔌 API Contract

The frontend communicates with the backend via these primary endpoints:

| Method | Endpoint         | Description                                     |
| ------ | ---------------- | ----------------------------------------------- |
| `GET`  | `/stories`       | Fetches list of available characters/scenarios. |
| `POST` | `/start-game`    | Initializes a new game session.                 |
| `POST` | `/submit-answer` | Sends player choice & calculates consequences.  |

---

## 👥 The Team

Built for **Devpost Hackathon 2025**.

- **Backend Architecture:** [Fatih Jawwad](https://www.google.com/search?q=https://github.com/jaweed3)
- **Frontend Engineering:** [Farrel Ghozy](https://www.google.com/search?q=https://github.com/FarrelGhozy)
- **System Integration:** [Syahansyah Naufal](https://www.google.com/search?q=https://github.com/shahansyah)
- **Narrative Design:** [Rifda Zahrina](https://www.google.com/search?q=https://github.com/rifdazahrina)

---

<div align="center">
<small>Open Source Project under MIT License</small>
</div>

> _Built for Devpost Hackathon 2025_
