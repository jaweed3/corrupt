import json
import os
import glob
from typing import Dict, Optional, List

# Path folder stories
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STORIES_DIR = os.path.join(BASE_DIR, "data", "stories")

class StoryEngine:
    def __init__(self):
        self.stories = {} # Format: { "hayes": {data...}, "budi": {data...} }
        self._load_all_stories()

    def _load_all_stories(self):
        """Scan folder stories dan load semua .json"""
        if not os.path.exists(STORIES_DIR):
            os.makedirs(STORIES_DIR) # Bikin folder kalau belum ada
            print(f"WARNING: Folder {STORIES_DIR} dibuat. Masukkan file JSON ke sana!")
            return

        # Cari semua file .json
        json_files = glob.glob(os.path.join(STORIES_DIR, "*.json"))
        
        for file_path in json_files:
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    sid = data.get("story_id")
                    if sid:
                        self.stories[sid] = data
                        print(f"Loaded story: {sid}")
                    else:
                        print(f"SKIP: File {file_path} tidak punya 'story_id'")
            except Exception as e:
                print(f"ERROR Loading {file_path}: {e}")

    def get_all_stories_metadata(self) -> List[Dict]:
        """Buat menu pilihan karakter"""
        meta = []
        for sid, data in self.stories.items():
            meta.append({
                "story_id": sid,
                "title": data.get("title", "No Title"),
                "role_name": data.get("role_name", "Unknown Role"),
                "description": data.get("description", "No Description")
            })
        return meta

    def get_story_data(self, story_id: str) -> Optional[Dict]:
        return self.stories.get(story_id)

    def get_chapter(self, story_id: str, chapter_id: str) -> Optional[Dict]:
        story = self.stories.get(story_id)
        if story:
            return story.get("chapters", {}).get(chapter_id)
        return None

# Singleton
story_engine = StoryEngine()
sessions_db = {}
