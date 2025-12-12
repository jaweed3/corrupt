from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uuid

# Import modul kita
from .models import *
from .database import sessions_db, story_engine
from .logic import calculate_new_stats, check_game_over

app = FastAPI(title="The Corruptor API")

# Setup CORS (Wajib biar Frontend bisa connect)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Corruption Simulator API is Live!"}

@app.get("/stories")
def get_stories():
    # Ini buat menu frontend
    return {"stories": story_engine.get_all_metadata()}

@app.post("/start-game")
def start_game(payload: StartGameRequest): # Pastikan model StartGameRequest ada field 'story_id'
    sid = payload.story_id
    story = story_engine.get_story(sid)
    
    if not story:
        raise HTTPException(404, "Story not found")
        
    session_id = str(uuid.uuid4())
    
    # Init Stats (Bisa ambil dari JSON kalau ada field initial_stats, atau hardcode dulu)
    initial_stats = {"money": 10000, "trust": 50, "risk": 0}
    
    # Default chapter pertama "chapter1"
    first_chapter = story_engine.get_chapter(sid, "chapter1")
    
    sessions_db[session_id] = {
        "story_id": sid,
        "stats": initial_stats,
        "current_chapter_id": "chapter1"
    }
    
    # Return format yang diminta Frontend
    # (Sesuaikan sama ScenarioDisplay model lu)
    return {
        "session_id": session_id,
        "stats": initial_stats,
        "current_scenario": {
            "id": "chapter1",
            "title": first_chapter["title"],
            "description": first_chapter["description"],
            "choices": [
                {"id": "A", "label": first_chapter["choices"]["A"]["description"]},
                {"id": "B", "label": first_chapter["choices"]["B"]["description"]}
            ]
        }
    }

@app.post("/submit-answer", response_model=SubmitAnswerResponse)
def submit_answer(payload: SubmitAnswerRequest):
    if payload.session_id not in sessions_db:
        raise HTTPException(404, "Session not found")
    
    session = sessions_db[payload.session_id]
    
    # Ambil Story ID dari session user ini
    user_story_id = session["story_id"] 
    current_chap_id = session["current_chapter_id"]
    
    # Ambil data chapter dari cerita yang BENAR
    chapter_data = story_engine.get_chapter(user_story_id, current_chap_id)
    
    choice_key = payload.choice_id # "A" atau "B"
    choice_data = chapter_data["choices"].get(choice_key)
    
    if not choice_data:
        raise HTTPException(400, "Pilihan tidak valid (harus A atau B).")

    # 3. Update Stats
    new_stats = calculate_new_stats(session["stats"], choice_data)
    session["stats"] = new_stats
    
    # 4. Tentukan Next Chapter / Game Over
    next_chapter_id = choice_data["next"]
    game_status = check_game_over(new_stats, next_chapter_id)
    
    response_payload = {
        "game_status": game_status,
        "stats_update": Stats(**new_stats),
        "feedback_text": f"Konsekuensi diambil. (Risk: {choice_data.get('risk', 0)})",
        "next_scenario": None
    }

    # 5. Handle Next Scenario (Kalau belum Game Over)
    if game_status == "ONGOING":
        next_chap_data = story_engine.get_chapter(next_chapter_id)
        if next_chap_data:
            session["current_chapter_id"] = next_chapter_id
            response_payload["next_scenario"] = ScenarioDisplay(
                id=next_chapter_id,
                title=next_chap_data["title"],
                description=next_chap_data["description"],
                dilemma=next_chap_data.get("dilemma", ""),
                choices=[
                    ChoiceOption(id="A", description=next_chap_data["choices"]["A"]["description"]),
                    ChoiceOption(id="B", description=next_chap_data["choices"]["B"]["description"])
                ]
            )
        else:
            # Fallback kalau next chapter gak ada di JSON (Error cerita)
            response_payload["game_status"] = "WIN"
            response_payload["feedback_text"] = "Cerita berakhir (Data chapter selanjutnya tidak ditemukan)."

    return SubmitAnswerResponse(**response_payload)
