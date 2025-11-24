const numberEl = document.getElementById("number");
const btn = document.getElementById("btn");
const gameOverEl = document.getElementById("game-over");

btn.addEventListener("click", async () => {
  try {
    const res = await fetch("http://localhost:3000/api"); // ganti sesuai API tim kamu
    const data = await res.json();

    // update angka
    numberEl.textContent = data.number;

    // cek game over
    if (data.game_over === true) {
      gameOverEl.style.display = "block";
      btn.style.display = "none";
    }
  } catch (err) {
    console.error("Error:", err);
  }
});
