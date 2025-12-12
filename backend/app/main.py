from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uuid

# Import modul lokal
from .models import *
from .database import story_engine, sessions_db
from .logic import calculate_new_stats, check_game_over

app = FastAPI(title="The Corruptor API")

# Setup CORS (Supaya Frontend React bisa akses)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Di production ganti "*" dengan domain frontend kamu
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Corruption Simulator API Ready", "status": "Online"}

@app.get("/stories", response_model=StoryListResponse)
def get_available_stories():
    """Mengambil daftar karakter untuk menu utama"""
    metadata = story_engine.get_all_metadata()
    return {"stories": metadata}

@app.post("/start-game", response_model=StartGameResponse)
def start_game(payload: StartGameRequest):
    sid = payload.story_id
    story = story_engine.get_story(sid)
    
    if not story:
        raise HTTPException(404, "Story ID tidak ditemukan.")
    
    session_id = str(uuid.uuid4())
    
    # Init Stats Awal (Bisa diset default di sini)
    initial_stats = {"money": 10000, "trust": 50, "risk": 0}
    
    # Load Chapter 1
    # (Asumsi JSON selalu mulai dari key "chapter1")
    first_chapter = story_engine.get_chapter(sid, "chapter1")
    if not first_chapter:
        raise HTTPException(500, "Chapter 1 corrupt/hilang.")

    # Simpan Session
    sessions_db[session_id] = {
        "story_id": sid,
        "stats": initial_stats,
        "current_chapter_id": "chapter1",
        "history": []
    }
    
    # Siapkan Response ke Frontend
    return StartGameResponse(
        session_id=session_id,
        stats=Stats(**initial_stats),
        current_scenario=ScenarioDisplay(
            id="chapter1",
            title=first_chapter["title"],
            description=first_chapter["description"],
            dilemma=first_chapter.get("dilemma", "Apa keputusan Anda?"),
            choices=[
                ChoiceOption(id="A", description=first_chapter["choices"]["A"]["description"]),
                ChoiceOption(id="B", description=first_chapter["choices"]["B"]["description"])
            ]
        )
    )

@app.post("/submit-answer", response_model=SubmitAnswerResponse)
def submit_answer(payload: SubmitAnswerRequest):
    # 1. Cek Session
    if payload.session_id not in sessions_db:
        raise HTTPException(404, "Session tidak ditemukan / Expired")
    
    session = sessions_db[payload.session_id]
    story_id = session["story_id"]
    current_chap_id = session["current_chapter_id"]
    
    # 2. Ambil Data Chapter Sekarang
    chapter_data = story_engine.get_chapter(story_id, current_chap_id)
    
    # 3. Ambil Pilihan User (A atau B)
    choice_key = payload.choice_id
    choice_data = chapter_data["choices"].get(choice_key)
    
    if not choice_data:
        raise HTTPException(400, "Pilihan tidak valid")

    # 4. Hitung Stats Baru
    new_stats = calculate_new_stats(session["stats"], choice_data)
    session["stats"] = new_stats # Update DB Memory
    
    # 5. Cek Game Over / Lanjut
    next_chapter_id = choice_data.get("next")
    game_status = check_game_over(new_stats, next_chapter_id)
    
    # Ambil feedback text dari JSON
    feedback = choice_data.get("feedback", "Konsekuensi diterima.")
    
    response_payload = {
        "game_status": game_status,
        "stats_update": Stats(**new_stats),
        "feedback_text": feedback,
        "next_scenario": None
    }
    
    # 6. Jika Game Masih Lanjut, Load Chapter Berikutnya
    if game_status == "ONGOING":
        next_chap_data = story_engine.get_chapter(story_id, next_chapter_id)
        
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
            # Fallback jika next chapter tidak ditemukan di JSON (Error typo di JSON)
            response_payload["game_status"] = "WIN" 
            response_payload["feedback_text"] += " (Cerita berakhir - Data chapter habis)"

    return SubmitAnswerResponse(**response_payload)
