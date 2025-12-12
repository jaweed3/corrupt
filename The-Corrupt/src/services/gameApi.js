// The-Corrupt/src/services/gameApi.js

const API_URL = "http://localhost:8000"; // Ganti URL Railway kalau udah deploy

export const getStories = async () => {
  try {
    const res = await fetch(`${API_URL}/stories`);
    if (!res.ok) throw new Error("Gagal load stories");
    return await res.json();
  } catch (err) {
    console.error(err);
    return { stories: [] };
  }
};

export const startGame = async (storyId) => {
  const res = await fetch(`${API_URL}/start-game`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ story_id: storyId }),
  });
  return await res.json();
};

export const submitAnswer = async (sessionId, choiceId) => {
  const res = await fetch(`${API_URL}/submit-answer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ session_id: sessionId, choice_id: choiceId }),
  });
  return await res.json();
};
