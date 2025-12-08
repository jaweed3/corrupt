const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// API contoh
app.get("/", (req, res) => {
  res.json({ message: "API The Corruptor berjalan!" });
});

// ==== Tambahkan ini ====
app.get("/stories", (req, res) => {
  res.json({
    stories: [
      {
        story_id: "jaksa_hayes",
        title: "Kasus Mr. Hayes",
        role_name: "Jaksa Hayes",
        description:
          "Anda adalah jaksa yang sedang menangani kasus korupsi besar.",
      },
      {
        story_id: "lurah_budi",
        title: "Dana Desa 1 M",
        role_name: "Lurah Budi",
        description: "Anda baru menjabat lurah dengan dana desa 1 miliar.",
      },
    ],
  });
});
// ======================

// Nyalakan server
app.listen(3000, () => {
  console.log("Server berjalan di http://localhost:3000");
});
