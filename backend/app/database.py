import json
import os
import glob
from typing import Dict, Optional, List

# Path ke folder stories
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STORIES_DIR = os.path.join(BASE_DIR, "data", "stories")

class StoryEngine:
    def __init__(self):
        self.stories = {} 
        self._load_all_stories()

    def _load_all_stories(self):
        """Scan folder stories dan load semua .json"""
        if not os.path.exists(STORIES_DIR):
            os.makedirs(STORIES_DIR)
            print(f"WARNING: Folder {STORIES_DIR} dibuat. Masukkan file JSON ke sana!")
            return

        # Cari semua file .json
        json_files = glob.glob(os.path.join(STORIES_DIR, "*.json"))
        print(f"🔍 Loading stories from: {STORIES_DIR}")
        
        for file_path in json_files:
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    # Pastikan ada story_id
                    sid = data.get("story_id")
                    if sid:
                        self.stories[sid] = data
                        print(f"✅ Loaded Story: {sid}")
                    else:
                        print(f"⚠️ SKIP: File {file_path} tidak punya 'story_id'")
            except Exception as e:
                print(f"❌ ERROR Loading {file_path}: {e}")

    def get_all_metadata(self) -> List[Dict]:
        """Buat menu pilih karakter"""
        meta = []
        for sid, data in self.stories.items():
            meta.append({
                "story_id": sid,
                "title": data.get("title", "No Title"),
                "role": data.get("role_name", "Unknown Role"),
                "desc": data.get("description", "...")
            })
        return meta

    def get_story(self, sid: str):
        return self.stories.get(sid)

    def get_chapter(self, sid: str, chapter_id: str):
        story = self.stories.get(sid)
        if story:
            return story.get("chapters", {}).get(chapter_id)
        return None

# Singleton Instance
story_engine = StoryEngine()
sessions_db = {}
