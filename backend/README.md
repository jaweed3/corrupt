# 🧠 The Corruptor – Backend Service

Technical documentation for the “brain” of the **The Corruptor** simulation.
This backend is built using **Python (FastAPI)** to handle game logic, statistical calculations, and dynamic story management.

## ⚡ Quick Start (How to Run)

For frontend developers or integrators who want to run the backend locally:

### 1. Prerequisites

Make sure **Python 3.9+** is installed.

### 2. Install & Run

Open a terminal in the `backend/` directory:

```bash
cd backend
# 1. Create a virtual environment (optional but recommended)
python -m venv venv
# Windows: venv\Scripts\activate
# Mac/Linux: source venv/bin/activate

# 2. Install dependencies
pip install fastapi uvicorn

# 3. Run the server
uvicorn app.main:app --reload
```

* **API Base URL:** `http://127.0.0.1:8000`
* **Interactive Docs (Swagger):** `http://127.0.0.1:8000/docs` (Open this to test the API without writing code).

---

## 📡 API Endpoints (Integration Contract)

This section is a guide for **Frontend / Hybrid Developers**.
Do not call any endpoints other than those listed here.

### 1. 📜 Get Available Stories (Main Menu)

Retrieve the list of available characters/stories to be displayed on the landing page.

* **URL:** `GET /stories`
* **Response:**

  ```json
  {
    "stories": [
      {
        "story_id": "jaksa_hayes",
        "title": "Shadows Behind the Marble Desk",
        "role": "Mr. Hayes (Prosecutor)",
        "desc": "You are a prosecutor buried in debt..."
      },
      {
        "story_id": "arshela_pewaris",
        "title": "Arshela: Heir to the Throne",
        "role": "Prime Minister’s Daughter",
        "desc": "..."
      }
    ]
  }
  ```

### 2. ▶️ Start Game

Start a new game session based on the selected character.

* **URL:** `POST /start-game`
* **Request Body:**

  ```json
  {
    "story_id": "jaksa_hayes" // ID from the /stories endpoint
  }
  ```
* **Response (200 OK):**

  ```json
  {
    "session_id": "unique-user-uuid",
    "stats": {
      "money": 10000,
      "trust": 50,
      "risk": 0
    },
    "current_scenario": {
      "id": "chapter1",
      "title": "Chapter 1: Salary Dilemma",
      "description": "Your monthly salary is gone...",
      "dilemma": "What should you do?",
      "choices": [
        { "id": "A", "description": "Accept the Bribe" },
        { "id": "B", "description": "Reject the Bribe" }
      ]
    }
  }
  ```

### 3. 🎲 Submit Answer

Submit the user’s choice and receive the consequences.

* **URL:** `POST /submit-answer`
* **Request Body:**

  ```json
  {
    "session_id": "unique-user-uuid",
    "choice_id": "A" // Must be "A" or "B"
  }
  ```
* **Response (200 OK):**

  ```json
  {
    "game_status": "ONGOING", // Possible values: "ONGOING", "GAME_OVER_BUSTED", "GAME_OVER_FIRED", "WIN"
    "stats_update": {
      "money": 60000,
      "trust": 15,
      "risk": 10
    },
    "feedback_text": "You are wealthy, but the public is starting to get suspicious.",
    "next_scenario": {
      // The next scenario object (same structure as in Start Game)
      // NULL if game_status is not "ONGOING"
    }
  }
  ```

---

## 📝 Story JSON Format (For Storytellers)

Story files are stored in `backend/app/data/stories/`.
Each file represents one character.

**Rules:**

1. **Numbers:** `money`, `trust`, and `risk` must be **INTEGER** values. Do not include parentheses or explanatory text.
2. **Next:** The next chapter ID must be defined in the `next` field.
3. **Ending:** If the story ends, set `"next": "Selesai"`.

**Example File Structure (`jaksa_hayes.json`):**

```json
{
  "story_id": "jaksa_hayes",
  "title": "Story Title",
  "role_name": "Role Name",
  "description": "Short synopsis...",
  "chapters": {
    "chapter1": {
      "title": "Chapter Title",
      "description": "Story narrative...",
      "dilemma": "The dilemma question?",
      "choices": {
        "A": {
          "description": "Button Label A",
          "money": 50000,
          "trust": -20,
          "risk": 10,
          "next": "chapter2_A",
          "feedback": "Message shown after the click."
        },
        "B": {
          "description": "Button Label B",
          "money": 0,
          "trust": 10,
          "risk": -5,
          "next": "chapter2_B",
          "feedback": "Message shown after the click."
        }
      }
    }
  }
}
```

---

## ⚖️ Game Logic (Win/Loss Rules)

The backend automatically evaluates game statistics using the following rules:

1. **Money:** Unlimited (can go negative due to debt).
2. **Trust (Public Trust):**

   * Range: 0 – 100.
   * **GAME OVER** if Trust ≤ 0 (the user is fired or overthrown by protests).
3. **Risk (Investigation Risk):**

   * Range: 0 – 100.
   * **GAME OVER** if Risk ≥ 100 (the user is arrested by the anti-corruption agency).
4. **WIN:** The user successfully completes all chapters without triggering a Game Over.

---

### 🆘 Troubleshooting

* **Error: `Module not found`?**
  Make sure you have run `pip install fastapi uvicorn`.
* **Frontend Fetch Failed (CORS Error)?**
  The backend is configured with `allow_origins=["*"]`, so it should be safe. Ensure the URL is correct.
* **Stories Not Loading?**
  Check that the JSON files exist in `backend/app/data/stories/`. Review the backend terminal logs for any loading errors.
