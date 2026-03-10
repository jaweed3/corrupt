# 🕵️‍♂️ The Corruptor: Simulation Edukasi Korupsi

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

## 📂 Struktur Repositori

```bash
The-Corruptor/
├── backend/                # Layanan API (Python & FastAPI)
│   ├── app/
│   │   ├── data/stories/   # Database Skenario (JSON)
│   │   ├── database.py     # Engine pemuatan cerita
│   │   ├── logic.py        # Kalkulator statistik & Game Over
│   │   ├── main.py         # Entry point FastAPI
│   │   └── models.py       # Definisi skema data (Pydantic)
│   ├── Dockerfile          # Konfigurasi Container Backend
│   └── requirements.txt    # Daftar dependensi Python
├── frontend/               # Antarmuka Pengguna (React & Vite)
│   ├── src/
│   │   ├── components/     # UI Components (HUD, Story, Screens)
│   │   ├── data/           # Metadata Kreator
│   │   └── api.js          # Client Axios untuk koneksi ke API
│   ├── Dockerfile          # Konfigurasi Container Frontend
│   └── package.json        # Daftar dependensi Node.js
├── docker-compose.yml      # Orchestrator untuk menjalankan semua layanan
└── README.md               # Dokumentasi Utama
```

---

## 🎮 Skenario yang Tersedia

Game ini mendukung sistem cerita dinamis berbasis JSON. Saat ini tersedia 3 skenario utama:
*   **Arshela: Anak Konglomerat**: Navigasi politik sebagai pewaris kekuasaan.
*   **Hayes: Di Balik Meja Marmer**: Dilema seorang Jaksa yang terhimpit kebutuhan ekonomi.
*   **Ketua Partai Yeska**: Manajemen dana kampanye dan loyalitas konstituen.

---

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

---

## 🚀 Panduan Instalasi: Tanpa Docker (Dari Nol)

Gunakan metode ini jika Anda ingin melakukan pengembangan (development) secara langsung pada kode.

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

# Install Dependensi
npm install

# Jalankan Aplikasi Dev
npm run dev
```
Buka browser Anda ke alamat `http://localhost:5173`.

---

## 👥 Tim Pengembang

Proyek ini dibangun oleh tim kolaboratif:
*   **Fatih Jawad Al Mumtaz** - Lead Developer & Backend Engineer
*   **Farrel Ghozy Affifudin** - Frontend Developer
*   **Rifda** - Narrative Designer
*   **Syahan Syah** - Full Stack Integrator

---

## 📜 Lisensi
Proyek ini dilisensikan di bawah **MIT License**. Gunakan dengan bijak untuk tujuan edukasi.

---
<div align="center">
  <sub>Built with ❤️ for a Better Society.</sub>
</div>
