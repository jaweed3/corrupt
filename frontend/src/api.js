// src/api.js
import axios from "axios";

// Pastikan port sesuai dengan tempat FastAPI berjalan (default 8000)
const API_BASE_URL = "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getStories = async () => {
  try {
    const response = await api.get("/stories");
    return response.data.stories; // Mengembalikan array metadata cerita
  } catch (error) {
    console.error("Error fetching stories:", error);
    throw error;
  }
};

export const startGame = async (storyId) => {
  try {
    // Sesuai payload StartGameRequest di backend
    const response = await api.post("/start-game", { story_id: storyId });
    return response.data; // { session_id, stats, current_scenario }
  } catch (error) {
    console.error("Error starting game:", error);
    throw error;
  }
};

export const submitAnswer = async (sessionId, choiceId) => {
  try {
    // Sesuai payload SubmitAnswerRequest di backend
    const response = await api.post("/submit-answer", {
      session_id: sessionId,
      choice_id: choiceId,
    });
    return response.data; // { game_status, stats_update, feedback_text, next_scenario }
  } catch (error) {
    console.error("Error submitting answer:", error);
    throw error;
  }
};

export default api;
