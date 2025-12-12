// src/services/gameApi.js

const BASE_URL = "http://127.0.0.1:8000";

// 1. Ambil daftar cerita / karakter
export const fetchStories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/stories`);
    if (!response.ok) throw new Error("Gagal ambil cerita");
    return await response.json();
  } catch (error) {
    console.error(error);
    return {
      stories: [
        {
          story_id: "dummy",
          title: "Mode Offline",
          role_name: "Test",
          description: "Backend sedang offline.",
        },
      ],
    };
  }
};

// 2. Mulai game
export const startGame = async (storyId) => {
  const response = await fetch(`${BASE_URL}/start-game`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ story_id: storyId }),
  });
  return await response.json();
};

// 3. Kirim jawaban
export const submitAnswer = async (sessionId, choiceId) => {
  const response = await fetch(`${BASE_URL}/submit-answer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      session_id: sessionId,
      choice_id: choiceId,
    }),
  });
  return await response.json();
};
