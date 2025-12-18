<div align="center">

# 🕵️‍♂️ The Corruptor

**Corruption Education Simulator**

![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.95+-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-4.0+-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
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
│   ├── Dockerfile          # Backend Container Config
│   ├── requirements.txt    # Python Dependencies
│   └── README.md
│
├── frontend/               # Client-side Application
│   ├── src/
│   │   ├── components/     # React UI Components
│   │   ├── data/           # API Handlers & Static JS Data
│   │   ├── App.jsx         # Main Router
│   │   └── main.jsx        # React Entry Point
│   ├── Dockerfile          # Frontend Container Config
│   ├── package.json        # Node Dependencies
│   ├── vite.config.js      # Bundler Config
│   └── README.md
│
├── docker-compose.yml      # Orchestration Config
└── README.md               # This Documentation

```

---

## 🚀 Quick Start

You can run this project using **Docker (Recommended)** or by setting up the environment manually.

### Option 1: Run with Docker 🐳 (Recommended)

This is the easiest way to run the full stack without installing Python or Node.js locally.

1. **Prerequisites:** Ensure you have [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.
2. **Run Command:**
Open your terminal in the root folder and run:
```bash
docker-compose up --build

```


3. **Access the App:**
* **Frontend (Game):** Open [http://localhost:5173](https://www.google.com/search?q=http://localhost:5173)
* **Backend (API Docs):** Open [http://localhost:8000/docs](https://www.google.com/search?q=http://localhost:8000/docs)


4. **Stop:** Press `Ctrl+C` in the terminal to stop the containers.

---

### Option 2: Manual Setup 🛠️

If you prefer running services individually on your machine.

#### 1. Backend Setup (The Brain)

Open a terminal and navigate to the `backend` folder.

```bash
cd backend

# 1. Create virtual environment (Optional but recommended)
python -m venv venv
# Windows: venv\Scripts\activate
# Mac/Linux: source venv/bin/activate

# 2. Install Dependencies
pip install -r requirements.txt

# 3. Run Server
uvicorn app.main:app --reload

```

*Backend will run at:* `http://localhost:8000`

#### 2. Frontend Setup (The Face)

Open a **new terminal** and navigate to the `frontend` folder.

```bash
cd frontend

# 1. Install dependencies
npm install

# 2. Run the App
npm run dev

```

*Frontend will run at:* `http://localhost:5173`

---

## 🔌 API Contract

The frontend communicates with the backend via these primary endpoints:

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/stories` | Fetches list of available characters/scenarios. |
| `POST` | `/start-game` | Initializes a new game session. |
| `POST` | `/submit-answer` | Sends player choice & calculates consequences. |

---

## 👥 The Team

Built for **Devpost Hackathon 2025**.

* **Backend Architecture:** [Fatih Jawwad](https://www.google.com/search?q=https://github.com/jaweed3)
* **Frontend Engineering:** [Farrel Ghozy](https://www.google.com/search?q=https://github.com/FarrelGhozy)
* **System Integration:** [Syahansyah Naufal](https://www.google.com/search?q=https://github.com/shahansyah)
* **Narrative Design:** [Rifda Zahrina](https://www.google.com/search?q=https://github.com/rifdazahrina)

---

<div align="center">
<small>Open Source Project under MIT License</small>
</div>

> *Built for Devpost Hackathon 2025*

```

```
