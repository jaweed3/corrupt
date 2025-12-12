# 🧠 The Corruptor - Backend Service

Dokumentasi teknis untuk "Otak" dari simulasi **The Corruptor**.
Backend ini dibangun menggunakan **Python (FastAPI)** untuk menangani logika permainan, kalkulasi statistik, dan manajemen cerita yang dinamis.

## ⚡ Quick Start (Cara Menjalankan)

Buat teman-teman Frontend atau Integrator yang mau jalanin backend di laptop sendiri:

### 1\. Prasyarat

Pastikan sudah install **Python 3.9+**.

### 2\. Install & Run

Buka terminal di folder `backend/`:

```bash
# 1. Buat virtual environment (Opsional tapi disarankan)
python -m venv venv
# Windows: venv\Scripts\activate
# Mac/Linux: source venv/bin/activate

# 2. Install Library
pip install fastapi uvicorn

# 3. Jalankan Server
uvicorn app.main:app --reload
```

  * **API Base URL:** `http://127.0.0.1:8000`
  * **Interactive Docs (Swagger):** `http://127.0.0.1:8000/docs` (Buka ini untuk ngetes API tanpa coding).

-----

## 📡 API Endpoints (Kontrak Integrasi)

Ini adalah panduan untuk **Frontend / Hybrid Dev**. Jangan panggil endpoint lain selain yang ada di sini.

### 1\. 📜 Get Available Stories (Menu Awal)

Mengambil daftar karakter/cerita yang tersedia untuk ditampilkan di halaman depan.

  * **URL:** `GET /stories`
  * **Response:**
    ```json
    {
      "stories": [
        {
          "story_id": "jaksa_hayes",
          "title": "Bayangan di Balik Meja Marmer",
          "role": "Mr. Hayes (Jaksa)",
          "desc": "Anda adalah Jaksa yang terhimpit hutang..."
        },
        {
          "story_id": "arshela_pewaris",
          "title": "Arshela: Pewaris Takhta",
          "role": "Putri Perdana Menteri",
          "desc": "..."
        }
      ]
    }
    ```

### 2\. ▶️ Start Game (Mulai Main)

Memulai sesi permainan baru berdasarkan karakter yang dipilih.

  * **URL:** `POST /start-game`
  * **Body (Request):**
    ```json
    {
      "story_id": "jaksa_hayes"  // ID dari endpoint /stories
    }
    ```
  * **Response (200 OK):**
    ```json
    {
      "session_id": "uuid-unik-user-ini",
      "stats": {
        "money": 10000,
        "trust": 50,
        "risk": 0
      },
      "current_scenario": {
        "id": "chapter1",
        "title": "Babak 1: Dilema Gaji",
        "description": "Gaji bulanan Anda habis...",
        "dilemma": "Apa yang harus dilakukan?",
        "choices": [
          { "id": "A", "description": "Terima Suap" },
          { "id": "B", "description": "Tolak Suap" }
        ]
      }
    }
    ```

### 3\. 🎲 Submit Answer (Pilih Jawaban)

Mengirim pilihan user dan mendapatkan konsekuensinya.

  * **URL:** `POST /submit-answer`
  * **Body (Request):**
    ```json
    {
      "session_id": "uuid-unik-user-ini",
      "choice_id": "A"  // Harus "A" atau "B"
    }
    ```
  * **Response (200 OK):**
    ```json
    {
      "game_status": "ONGOING", // Bisa: "ONGOING", "GAME_OVER_BUSTED", "GAME_OVER_FIRED", "WIN"
      "stats_update": {
        "money": 60000,
        "trust": 15,
        "risk": 10
      },
      "feedback_text": "Anda kaya, tapi rakyat mulai curiga.",
      "next_scenario": {
        // Objek skenario berikutnya (Sama strukturnya kayak di Start Game)
        // BERNILAI NULL jika game_status bukan "ONGOING"
      }
    }
    ```

-----

## 📝 Format JSON Cerita (Untuk Storyteller)

File cerita disimpan di folder `backend/app/data/stories/`.
Setiap file mewakili satu karakter.

**Aturan Main:**

1.  **Angka:** `money`, `trust`, `risk` harus **INTEGER** (angka bulat). Jangan pakai tanda kurung atau teks penjelasan di dalamnya.
2.  **Next:** ID chapter berikutnya harus ada di field `next`.
3.  **Tamat:** Jika cerita berakhir, isi `"next": "Selesai"`.

**Contoh Struktur File (`jaksa_hayes.json`):**

```json
{
  "story_id": "jaksa_hayes",
  "title": "Judul Cerita",
  "role_name": "Nama Peran",
  "description": "Sinopsis singkat...",
  "chapters": {
    "chapter1": {
      "title": "Judul Bab",
      "description": "Narasi cerita...",
      "dilemma": "Pertanyaan dilema?",
      "choices": {
        "A": {
          "description": "Label Tombol A",
          "money": 50000,   // Menambah uang
          "trust": -20,     // Mengurangi kepercayaan
          "risk": 10,       // Menambah risiko
          "next": "chapter2_A",
          "feedback": "Pesan yang muncul setelah klik."
        },
        "B": {
          "description": "Label Tombol B",
          "money": 0,
          "trust": 10,
          "risk": -5,       // Mengurangi risiko
          "next": "chapter2_B",
          "feedback": "Pesan yang muncul setelah klik."
        }
      }
    }
  }
}
```

-----

## ⚖️ Game Logic (Aturan Menang/Kalah)

Backend secara otomatis menghitung stats dengan aturan berikut:

1.  **Money:** Tidak terbatas (bisa minus kalau utang).
2.  **Trust (Kepercayaan Publik):**
      * Batas: 0 - 100.
      * **GAME OVER** jika Trust \<= 0 (User dipecat/didemo).
3.  **Risk (Risiko Investigasi):**
      * Batas: 0 - 100.
      * **GAME OVER** jika Risk \>= 100 (User ditangkap KPK).
4.  **WIN:** Jika user berhasil menyelesaikan semua chapter tanpa Game Over.

-----

### 🆘 Troubleshooting

  * **Error: `Module not found`?**
    Pastikan kamu sudah `pip install fastapi uvicorn`.
  * **Frontend Gagal Fetch (CORS Error)?**
    Backend sudah diset `allow_origins=["*"]`, jadi aman. Pastikan URL-nya benar.
  * **Data Cerita Gak Muncul?**
    Cek apakah file JSON ada di folder `backend/app/data/stories/`. Cek log terminal backend untuk melihat pesan error loading.
