// src/api.js
import axios from "axios";

// Base URL diambil dari environment variable (Vite)
const API_BASE_URL = import.meta.env.VITE_API_URL;

if (!API_BASE_URL) {
  throw new Error(
    "VITE_API_URL is not defined. Please set it in your environment variables."
  );
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000, // aman untuk network cloud
});

// =========================
// API Calls
// =========================

export const getStories = async () => {
  const response = await api.get("/stories");
  return response.data.stories;
};

export const startGame = async (storyId) => {
  const response = await api.post("/start-game", {
    story_id: storyId,
  });
  return response.data;
};

export const submitAnswer = async (sessionId, choiceId) => {
  const response = await api.post("/submit-answer", {
    session_id: sessionId,
    choice_id: choiceId,
  });
  return response.data;
};

export default api;
