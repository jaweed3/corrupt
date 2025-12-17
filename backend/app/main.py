from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uuid

# Import modul lokal
from .models import *
from .database import story_engine, sessions_db
from .logic import calculate_new_stats, check_game_over

app = FastAPI(title="The Corruptor API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Corruption Simulator API Ready", "status": "Online"}

@app.get("/stories", response_model=StoryListResponse)
def get_available_stories():
    metadata = story_engine.get_all_metadata()
    return {"stories": metadata}

@app.post("/start-game", response_model=StartGameResponse)
def start_game(payload: StartGameRequest):
    sid = payload.story_id
    story = story_engine.get_story(sid)
    
    if not story:
        raise HTTPException(404, "Story ID tidak ditemukan.")
    
    session_id = str(uuid.uuid4())
    
    # PERBAIKAN 1: Ambil stats awal dari JSON (jika ada), kalau tidak ada pakai default
    # Pastikan di JSON cerita Anda tambahkan field "initial_stats"
    default_stats = {"money": 10000, "trust": 50, "risk": 0}
    initial_stats = story.get("initial_stats", default_stats)
    
    # PERBAIKAN 2: Cek key chapter pertama, default ke "chapter1" jika tidak diset
    start_chapter_id = story.get("start_chapter", "chapter1")
    first_chapter = story_engine.get_chapter(sid, start_chapter_id)
    
    if not first_chapter:
        raise HTTPException(500, f"Chapter awal '{start_chapter_id}' tidak ditemukan di JSON.")

    # Simpan Session
    sessions_db[session_id] = {
        "story_id": sid,
        "stats": initial_stats,
        "current_chapter_id": start_chapter_id,
        "history": []
    }
    
    # PERBAIKAN 3: Choices Dinamis (Bisa A, B, C, dst)
    choices_list = []
    for key, val in first_chapter["choices"].items():
        choices_list.append(ChoiceOption(id=key, description=val["description"]))
    
    return StartGameResponse(
        session_id=session_id,
        stats=Stats(**initial_stats),
        current_scenario=ScenarioDisplay(
            id=start_chapter_id,
            title=first_chapter["title"],
            description=first_chapter["description"],
            dilemma=first_chapter.get("dilemma", "Apa keputusan Anda?"),
            choices=choices_list 
        )
    )

@app.post("/submit-answer", response_model=SubmitAnswerResponse)
def submit_answer(payload: SubmitAnswerRequest):
    if payload.session_id not in sessions_db:
        raise HTTPException(404, "Session tidak ditemukan / Expired")
    
    session = sessions_db[payload.session_id]
    story_id = session["story_id"]
    current_chap_id = session["current_chapter_id"]
    
    chapter_data = story_engine.get_chapter(story_id, current_chap_id)
    
    # Validasi Pilihan
    choice_key = payload.choice_id
    choice_data = chapter_data["choices"].get(choice_key)
    
    if not choice_data:
        raise HTTPException(400, "Pilihan tidak valid")

    # Hitung Stats
    new_stats = calculate_new_stats(session["stats"], choice_data)
    session["stats"] = new_stats 
    
    # Cek Game Over
    next_chapter_id = choice_data.get("next")
    game_status = check_game_over(new_stats, next_chapter_id)
    feedback = choice_data.get("feedback", "Konsekuensi diterima.")
    
    response_payload = {
        "game_status": game_status,
        "stats_update": Stats(**new_stats),
        "feedback_text": feedback,
        "next_scenario": None
    }
    
    if game_status == "ONGOING":
        next_chap_data = story_engine.get_chapter(story_id, next_chapter_id)
        
        if next_chap_data:
            session["current_chapter_id"] = next_chapter_id
            
            # PERBAIKAN 3: Choices Dinamis di sini juga
            choices_list = []
            for key, val in next_chap_data["choices"].items():
                choices_list.append(ChoiceOption(id=key, description=val["description"]))

            response_payload["next_scenario"] = ScenarioDisplay(
                id=next_chapter_id,
                title=next_chap_data["title"],
                description=next_chap_data["description"],
                dilemma=next_chap_data.get("dilemma", ""),
                choices=choices_list
            )
        else:
            response_payload["game_status"] = "WIN" 
            response_payload["feedback_text"] += " (End of Content)"

    return SubmitAnswerResponse(**response_payload)