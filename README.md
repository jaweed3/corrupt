
<div align="center">

# 🕵️‍♂️ The Corruptor

**Corruption Education Simulator**

![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.95+-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-4.0+-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)


[![Docker](https://img.shields.io/badge/Docker-24.0+-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.95+-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.4+-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

**The Corruptor** adalah sebuah *Data-Driven Text-Based Simulation Game* yang dirancang untuk mengedukasi masyarakat mengenai bahaya dan mekanisme korupsi melalui pendekatan gamifikasi. Pemain akan berperan sebagai pejabat publik yang dihadapkan pada berbagai dilema moral, di mana setiap pilihan memiliki konsekuensi nyata terhadap integritas dan masa depan mereka.

---

## 📖 Tentang Proyek

Proyek ini bertujuan untuk menunjukkan fenomena *"Slippery Slope"*—bagaimana kompromi kecil pada integritas dapat berujung pada kehancuran sistemik.

### 📊 Mekanisme Utama (Game Metrics)
Pemain harus mengelola tiga indikator utama yang saling berkaitan:
1.  **💰 Dana (Money)**: Representasi kekayaan pribadi atau dana operasional. Bisa bertambah melalui suap, namun meningkatkan risiko.
2.  **🤝 Kepercayaan (Trust)**: Indikator legitimasi publik dan rekan kerja. Jika mencapai **0**, Anda akan dipecat atau didemo (Game Over).
3.  **⚠️ Risiko (Risk)**: Akumulasi kecurigaan pihak berwenang (KPK). Jika mencapai **100**, Anda akan ditangkap (Game Over).

---


## 📂 Project Structure


```bash
The-Corruptor/
├── backend/                # Layanan API (Python & FastAPI)
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

## 🐳 Panduan Instalasi: Menggunakan Docker (Dari Nol)

Metode ini sangat direkomendasikan karena Anda tidak perlu menginstal Python atau Node.js secara manual di komputer Anda.

### Prasyarat
1.  Instal **Docker Desktop** dari [docker.com](https://www.docker.com/products/docker-desktop/).
2.  Pastikan Docker sudah berjalan di latar belakang.

### Langkah-langkah
1.  **Clone Repositori:**
    ```bash
    git clone https://github.com/username-anda/the-corruptor.git
    cd the-corruptor
    ```
2.  **Jalankan dengan Docker Compose:**
    ```bash
    docker-compose up --build
    ```
3.  **Akses Aplikasi:**
    *   **Main Game:** [http://localhost:5173](http://localhost:5173)
    *   **Backend API:** [http://localhost:8000](http://localhost:8000)
    *   **Dokumentasi API (Swagger):** [http://localhost:8000/docs](http://localhost:8000/docs)

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

### Prasyarat
1.  Instal **Python 3.10+** (Pastikan centang "Add to PATH").
2.  Instal **Node.js 20+** (Termasuk npm).

### Langkah-langkah

#### 1. Menyiapkan Backend (API)
Buka terminal baru di folder proyek:
```bash
cd backend

# Buat Virtual Environment
python -m venv venv

# Aktifkan Venv (Windows)
venv\Scripts\activate
# Aktifkan Venv (Mac/Linux)
# source venv/bin/activate

# Install Dependensi
pip install -r requirements.txt

# Jalankan Server
uvicorn app.main:app --reload
```
Server backend akan berjalan di `http://localhost:8000`.

#### 2. Menyiapkan Frontend (UI)
Buka terminal **baru** (jangan tutup terminal backend):
```bash
cd frontend

# 1. Install dependencies
npm install

# 2. Run the App
npm run dev
```

*Frontend will run at:* `http://localhost:5173`

---

## 👥 Tim Pengembang

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
  <sub>Built with ❤️ for a Better Society.</sub>
</div>

> *Built for Devpost Hackathon 2025*

```

```
