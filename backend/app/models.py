from pydantic import BaseModel
from typing import Optional, List, Dict

# --- Komponen Data ---
class Stats(BaseModel):
    money: int
    trust: int
    risk: int

# Model untuk Metadata Cerita (Menu Pilih Karakter)
class StoryMetadata(BaseModel):
    story_id: str
    title: str
    role: str
    desc: str

class StoryListResponse(BaseModel):
    stories: List[StoryMetadata]

# Model Pilihan di Tombol
class ChoiceOption(BaseModel):
    id: str         # "A" atau "B"
    description: str # Label tombol

# Model Tampilan Skenario ke Frontend
class ScenarioDisplay(BaseModel):
    id: str
    title: str
    description: str
    dilemma: str
    choices: List[ChoiceOption]

# --- API Request/Response ---

class StartGameRequest(BaseModel):
    story_id: str

class StartGameResponse(BaseModel):
    session_id: str
    stats: Stats
    current_scenario: ScenarioDisplay

class SubmitAnswerRequest(BaseModel):
    session_id: str
    choice_id: str  # "A" atau "B"

class SubmitAnswerResponse(BaseModel):
    game_status: str        # "ONGOING", "GAME_OVER_BUSTED", "GAME_OVER_FIRED", "WIN"
    stats_update: Stats
    feedback_text: str      # Pesan konsekuensi dari JSON
    next_scenario: Optional[ScenarioDisplay] = None
