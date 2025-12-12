from pydantic import BaseModel
from typing import Optional, Dict, List

# --- Komponen Data ---
class Stats(BaseModel):
    money: int
    trust: int
    risk: int

class ChoiceOption(BaseModel):
    id: str         # "A" atau "B"
    description: str

class ScenarioDisplay(BaseModel):
    id: str
    title: str
    description: str
    dilemma: str
    choices: List[ChoiceOption]

# --- API Request/Response ---
class StartGameResponse(BaseModel):
    session_id: str
    stats: Stats
    current_scenario: ScenarioDisplay

class SubmitAnswerRequest(BaseModel):
    session_id: str
    choice_id: str  # "A" atau "B"

class SubmitAnswerResponse(BaseModel):
    game_status: str        # "ONGOING", "GAME_OVER", "WIN"
    stats_update: Stats
    feedback_text: str      # Kita ambil dari description pilihan
    next_scenario: Optional[ScenarioDisplay] = None

class StoryMetadata(BaseModel):
    story_id: str
    title: str
    role_name: str
    description: str

class StoryListResponse(BaseModel):
    stories: List[StoryMetadata]

# Request Start Game sekarang butuh ID cerita
class StartGameRequest(BaseModel):
    story_id: str
