# 🕵️‍♂️ The Corruptor: Corruption Education Simulator

> *"Don't just tell people corruption is bad. Let them feel the weight of the temptation, and the fatality of the consequences."*

## 📖 About The Project

**The Corruptor** is not just a digital law encyclopedia. It is a **Data-Driven Text-Based Simulation Game** that puts users in the shoes of public officials facing real-world moral dilemmas.

Unlike traditional educational tools, we use **gamification** and **psychological decision-making** to demonstrate the "slippery slope" of corruption. Players must balance three critical metrics:
1.  **💰 Personal Wealth**
2.  **📢 Public Trust**
3.  **⚖️ Investigation Risk**

### 🎮 Key Features
* **Multi-Perspective Storytelling:** Play as different characters (e.g., A Prosecutor trapped in debt, a Party Chairman facing political pressure).
* **Dynamic Consequence Engine:** Every choice impacts your stats immediately and determines your ending (Win, Fired, or Arrested).
* **Data-Driven Logic:** All narratives are decoupled from the code, powered by a robust JSON Engine.

-----

## 🛠 Tech Stack

We utilize a **modern, decoupled architecture** to ensure scalability and readiness for future Machine Learning integration.

* **Backend:** Python (FastAPI)
    * *Why?* Native async performance, strict data validation (Pydantic), and a rich AI/ML ecosystem (Pandas/Scikit-learn) for future behavioral analysis.
* **Frontend:** React.js (Vite) + Tailwind CSS
    * *Why?* Reactive UI for instant feedback and immersive experience.
* **Data Engine:** JSON-based Dynamic Loader
    * *Why?* Allows non-technical writers to update stories without touching the codebase.

-----

## 📂 Project Structure

```bash
/project-root
│
├── /backend                # Python FastAPI Service
│   ├── app/
│   │   ├── main.py         # API Gateway
│   │   ├── logic.py        # Game Math Engine
│   │   └── data/stories/   # JSON Story Files (The Narratives)
│   └── requirements.txt
│
├── /The-Corrupt            # Frontend Application (React)
│   ├── src/
│   │   ├── services/       # API Integration Layer
│   │   └── components/     # UI Components
│   └── package.json
│
└── README.md               # Project Documentation
````

-----

## 🚀 Quick Start (Local Development)

### 1\. Backend Setup (The Brain)

Make sure you have **Python 3.9+** installed.

```bash
cd backend

# Create virtual environment (Optional)
python -m venv venv
# Activate it (Windows: venv\Scripts\activate | Mac/Linux: source venv/bin/activate)

# Install dependencies
pip install fastapi uvicorn

# Run the Server
uvicorn app.main:app --reload
```

*Backend runs at:* `http://localhost:8000`  
*API Docs:* `http://localhost:8000/docs`

### 2\. Frontend Setup (The Face)

Make sure you have **Node.js** installed.

```bash
cd The-Corrupt

# Install dependencies
npm install

# Run the App
npm run dev
```

*Frontend runs at:* `http://localhost:5173`

-----

## 🔌 API Contract (Integration Guide)

Communication between Frontend and Backend follows this strict contract.

### 1\. Get Available Stories

Fetches the list of playable characters for the main menu.

  * **Endpoint:** `GET /stories`
  * **Response:**
    ```json
    {
      "stories": [
        {
          "story_id": "jaksa_hayes",
          "title": "Shadow Behind the Marble Table",
          "role": "Mr. Hayes (Prosecutor)",
          "desc": "You are a Prosecutor trapped in debt..."
        }
      ]
    }
    ```

### 2\. Start Game

Initializes a new session for a specific character.

  * **Endpoint:** `POST /start-game`
  * **Body:** `{"story_id": "jaksa_hayes"}`
  * **Response:**
    ```json
    {
      "session_id": "uuid-string",
      "stats": { "money": 10000, "trust": 50, "risk": 0 },
      "current_scenario": {
        "id": "chapter1",
        "title": "The Salary Dilemma",
        "description": "Your salary is gone...",
        "choices": [...]
      }
    }
    ```

### 3\. Submit Answer

Sends the player's choice to calculate consequences.

  * **Endpoint:** `POST /submit-answer`
  * **Body:** `{"session_id": "...", "choice_id": "A"}`
  * **Response:**
    ```json
    {
      "game_status": "ONGOING",
      "stats_update": { "money": 60000, "trust": 15, "risk": 10 },
      "feedback_text": "You are rich, but people are suspicious.",
      "next_scenario": { ... }
    }
    ```

-----

## 📝 Story Engine Schema (JSON)

Our engine allows **dynamic storytelling**. Narrative designers create content in JSON format located in `backend/app/data/stories/`.

**Structure Example:**

```json
{
  "story_id": "unique_id",
  "title": "Story Title",
  "role_name": "Character Role",
  "chapters": {
    "chapter1": {
      "title": "Scenario Title",
      "description": "Narrative text...",
      "dilemma": "What will you do?",
      "choices": {
        "A": {
          "description": "Take the Bribe",
          "money": 50000,
          "trust": -20,
          "risk": 10,
          "next": "chapter2_A",
          "feedback": "Instant wealth, but at what cost?"
        }
      }
    }
  }
}
```

-----

## 🔮 Future Roadmap

1.  **Corruption Profiler (ML):** We are collecting behavioral data to train a classification model that profiles user corruption archetypes (e.g., "The Opportunist" vs "The Mastermind").
2.  **Global Leaderboard:** Compare your "Integrity Score" with other players globally.
3.  **Real-time Analytics:** Dashboard to visualize how easily average users succumb to temptation.

-----

### 👥 Team

  * **Backend & Logic:** [Your Name]
  * **Frontend & UI:** [Friend's Name]
  * **Integration:** [Hybrid Friend's Name]
  * **Narrative Design:** [Storyteller's Name]

> *Built for [Devpost Hackathon Name] 2024*

```

### Apa yang Berubah?

1.  **Bahasa Inggris Full:** Sesuai permintaan untuk Devpost.
2.  **Folder Structure:** Saya sesuaikan dengan nama folder frontend kamu yang ternyata `The-Corrupt`, bukan `frontend`.
3.  **API Contract Baru:** Saya tambahkan endpoint `GET /stories` yang krusial untuk fitur pilih karakter, dan update request `Start Game` yang sekarang butuh `story_id`.
4.  **JSON Schema Baru:** Saya update contoh JSON-nya agar sesuai dengan struktur `chapters` (bukan list flat) yang baru saja kita implementasikan.
5.  **Branding:** Menambahkan tagline yang lebih dramatis di atas.

Langsung ganti file `README.md` utama dengan ini, lalu push ke GitHub! 🚀
```
