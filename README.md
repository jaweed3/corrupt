# Project: The Corruptor (Corruption Education Simulator)

> *"Jangan ajari orang untuk tidak korupsi. Tunjukkan pada mereka betapa mudahnya tergelincir, dan betapa fatal akibatnya."*

## 📖 About The Project

Web aplikasi ini bukan sekadar ensiklopedia hukum. Ini adalah **Text-Based Simulation Game** yang menempatkan pengguna di kursi pejabat publik. Pengguna dihadapkan pada dilema moral yang realistis, menyeimbangkan **Kekayaan Pribadi**, **Kepercayaan Publik**, dan **Risiko Penjara**.

**Core Philosophy:** Menggunakan gamifikasi dan *psychological decision-making* untuk menanamkan pemahaman tentang *slippery slope* korupsi.

-----

## 🛠 Tech Stack

Kami menggunakan pendekatan **Data-Driven Development** untuk mempersiapkan integrasi Machine Learning di masa depan.

  * **Backend:** Python (FastAPI)
      * *Reasoning:* Kecepatan development tinggi, performa async native, dan ekosistem AI/ML (Pandas/Scikit-learn) untuk fitur analisis perilaku user.
  * **Frontend:** React / Next.js (Tailwind CSS)
      * *Reasoning:* Interaktivitas UI reaktif untuk feedback state game instan.
  * **Data Store (MVP):** In-Memory / JSON Store
      * *Reasoning:* Rapid prototyping. Siap dimigrasikan ke PostgreSQL/Redis.

-----

## 📂 Project Structure

```bash
/project-root
│
├── /backend            # Python FastAPI Service
│   ├── main.py         # Entry point & Logic
│   ├── data/           # JSON Storage (Scenarios)
│   └── requirements.txt
│
├── /frontend           # React Application
│   ├── src/            # Components & Pages
│   └── package.json
│
└── README.md           # You are here
```

-----

## 🚀 Quick Start (Dev Mode)

### 1\. Backend Setup (The Brain)

Pastikan Python 3.9+ terinstall.

```bash
cd backend
# Buat virtual environment (Optional tapi disarankan)
python -m venv venv
# Aktifkan venv (Windows: venv\Scripts\activate | Mac/Linux: source venv/bin/activate)

# Install dependencies
pip install fastapi uvicorn pydantic

# Jalankan Server
uvicorn main:app --reload
```

*Backend akan berjalan di:* `http://localhost:8000`
*API Docs (Swagger) otomatis di:* `http://localhost:8000/docs`

### 2\. Frontend Setup (The Face)

Pastikan Node.js terinstall.

```bash
cd frontend
npm install
npm run dev
```

-----

## 🔌 API Contract (Untuk Tim Frontend)

Ini adalah kontrak mati komunikasi antara Frontend dan Backend.

### 1\. Start Game

Memulai sesi baru. Reset semua stats.

  * **Endpoint:** `POST /start-game`
  * **Response:**

<!-- end list -->

```json
{
  "session_id": "uuid-v4-string",
  "stats": {
    "money": 100,       // Juta Rupiah
    "trust": 50,        // Persen (0-100)
    "risk": 0           // Persen (0-100)
  },
  "current_scenario": {
    "id": "scen_1",
    "text": "Anda baru dilantik. Ada tawaran proyek fiktif.",
    "choices": [
        { "id": "a", "label": "Terima", "impact": "..." },
        { "id": "b", "label": "Tolak", "impact": "..." }
    ]
  }
}
```

### 2\. Submit Choice

Mengirim jawaban user dan mendapatkan dampak (konsekuensi).

  * **Endpoint:** `POST /submit-answer`
  * **Body:**

<!-- end list -->

```json
{
  "session_id": "uuid-v4-string",
  "choice_id": "a"
}
```

  * **Response:**

<!-- end list -->

```json
{
  "game_status": "ONGOING", // atau "GAME_OVER"
  "stats_update": {
    "money": 150,
    "trust": 40,
    "risk": 15
  },
  "feedback_text": "Uang masuk rekening, tapi KPK mulai memantau.",
  "next_scenario": { ... } // Object skenario berikutnya (Null jika Game Over)
}
```

-----

## 📝 Data Schema (Untuk Tim Storyteller)

Format penulisan skenario dalam `JSON` atau Spreadsheet harus mengandung elemen ini:

| Field | Tipe | Deskripsi |
| :--- | :--- | :--- |
| `id` | String | Unik (misal: `level_1_kasus_ktp`) |
| `text` | String | Narasi kasus (Max 200 karakter) |
| `choices` | Array | Minimal 2 pilihan (A/B) |
| `impact` | Object | Dampak matematis ke `money`, `trust`, `risk` |

**Contoh Logic Impact:**

  * **Money:** `+` menambah uang, `-` mengurangi uang.
  * **Trust:** Jika `0`, Game Over (Lengser).
  * **Risk:** Jika `100`, Game Over (Ditangkap).

-----

## 🔮 Future Roadmap (ML Integration)

Fitur yang disiapkan untuk tahap selanjutnya:

1.  **Corruption Profiler:** Mengklasifikasikan gaya bermain user (e.g., "The Mastermind", "The Petty Thief") menggunakan *Rule-based Classification*.
2.  **Dynamic Difficulty:** Algoritma penyesuaian tingkat kesulitan skenario berdasarkan saldo uang user.

-----

### Perintah Khusus untuk Tim:

  * **Frontend:** Gunakan *dummy data* jika API belum ready, sesuaikan format dengan kontrak JSON di atas.
  * **Content:** Fokus pada kualitas cerita dan bobot konsekuensi. Buat pemain merasa bersalah.
  * **Backend:** Fokus pada kestabilan logika kalkulasi stats.

