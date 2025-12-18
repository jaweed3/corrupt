````markdown
# 🏛️ The Corrupt: Estambor Gov. Sim (Frontend)

![Project Status](https://img.shields.io/badge/Status-Active_Development-amber?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-1.0.0-slate?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

> _"In this country, honesty is the currency that holds no value."_

**The Corrupt** is a narrative-based political simulation game where players step into the shoes of a government official in the fictional region of **Estambor**. This repository contains the **Frontend** source code, built with React and Tailwind CSS, focusing on immersive UI, dynamic storytelling, and resource management mechanics.

---

## 📋 Table of Contents

- [✨ Key Features](#-key-features)
- [🛠️ Tech Stack](#-tech-stack)
- [📂 Project Structure](#-project-structure)
- [🖥️ UI Components & Modules](#-ui-components--modules)
- [🎮 Game Flow](#-game-flow)
- [🚀 Installation & Setup](#-installation--setup)
- [👥 The Team](#-the-team)

---

## ✨ Key Features

- **🎭 Immersive Narrative Engine**: A branching storyline interface where every choice matters.
- **📊 Dynamic HUD System**: Real-time tracking of three critical resources:
  - 💰 **Dana (Money):** Your operational budget and personal wealth.
  - 🤝 **Trust (Kepercayaan):** Public and peer approval ratings.
  - ⚠️ **Risk (Risiko):** The likelihood of being caught and arrested.
- **🎨 Atmospheric UI**: Dark-themed, political thriller aesthetic using `slate` and `amber` palettes with glassmorphism effects.
- **📜 Scenario Management**: A lobby system to browse and select different political cases/scenarios.
- **🔚 Multiple Endings**: Visual feedback for Victory, Bankruptcy (Money <= 0), or Arrest (Risk >= 100).

---

## 🛠️ Tech Stack

This project is built using modern web technologies to ensure performance and maintainability.

| Technology                                                                                                     | Purpose                              |
| :------------------------------------------------------------------------------------------------------------- | :----------------------------------- |
| ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)                     | Core Frontend Framework              |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white) | Utility-First Styling System         |
| ![Lucide](https://img.shields.io/badge/Lucide_Icons-F7df1e?style=flat&logo=lucide&logoColor=black)             | Lightweight & Consistent Iconography |
| ![Vite](https://img.shields.io/badge/Vite-B33030?style=flat&logo=vite&logoColor=white)                         | Fast Build Tool & Dev Server         |

---

## 📂 Project Structure

This structure reflects the current development environment.

```bash
frontend/
├── node_modules/           # Project dependencies
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI Components
│   │   ├── CreditsScreen.jsx       # Displays development team
│   │   ├── EndingScreen.jsx        # Game Over / Victory logic & UI
│   │   ├── HUD.jsx                 # Heads-Up Display (Money, Trust, Risk)
│   │   ├── LobbyScreen.jsx         # Scenario selection menu
│   │   ├── Navbar.jsx              # Top navigation bar
│   │   ├── ScenarioIntroScreen.jsx # Briefing screen before gameplay
│   │   ├── SplashScreen.jsx        # Initial landing animation
│   │   ├── StoryScreen.jsx         # Main gameplay loop (Decision making)
│   │   └── SystemMenu.jsx          # Pause / In-game menu
│   ├── data/               # Static Data & API Handlers
│   │   ├── api.js          # Backend integration logic
│   │   └── creators.js     # Team member data
│   ├── App.css             # Global styles
│   ├── App.jsx             # Main Application Logic & Routing
│   ├── index.css           # Tailwind directives
│   └── main.jsx            # Entry point
├── .gitignore
├── eslint.config.js        # Linting configuration
├── index.html              # HTML Root
├── package.json            # Project manifest
├── postcss.config.js       # CSS processing config
├── tailwind.config.js      # Tailwind theme config
└── vite.config.js          # Bundler config
```
````

---

## 🖥️ UI Components & Modules

Detailed documentation of the core components powering the simulation.

### 1. Navigation & System

- **`SplashScreen.jsx`**: The first screen users see. Features a dramatic entry animation, title reveal, and "Enter System" trigger.
- **`Navbar.jsx`**: A context-aware navigation bar. It handles transitions between the Lobby, Credits, and the in-game Pause menu.
- **`SystemMenu.jsx`**: An overlay modal allowing players to **Resume** their game or **Exit to Lobby** safely.

### 2. Gameplay Loop

- **`LobbyScreen.jsx`**: Fetches and displays available "Case Archives" (Scenarios). Includes role indicators and scenario descriptions.
- **`ScenarioIntroScreen.jsx`**: Provides the briefing for the selected mission. Allows players to review objectives before starting.
- **`StoryScreen.jsx`**: The heart of the game.
- Renders the current narrative node.
- Displays the "Dilemma".
- Presents choices (A/B) with hover effects.

- **`HUD.jsx`**: Sticks to the top of the gameplay screen.
- **Animations:** Includes pulse effects when Risk is high (>70%).
- **Visuals:** Uses progress bars for Trust and Risk, and currency formatting for Money.

### 3. Data & Logic

- **`data/api.js`**: Centralized module for fetching story nodes and handling player choices (API calls to Backend).
- **`data/creators.js`**: Contains static data about the development team for the Credits screen.

### 4. Conclusion

- **`EndingScreen.jsx`**: Handles the game state termination.
- **States:** `GAMEOVER_RISK` (Busted), `GAMEOVER_MONEY` (Bankrupt), `VICTORY`.
- **Trace Log:** Displays a history list of all choices made during the session.

---

## 🎮 Game Flow

1. **Splash Screen**: User initializes the system.
2. **Lobby**: User selects a political scenario (Case File).
3. **Intro**: User accepts the mission.
4. **Loop**:

- Read Story Node (from `StoryScreen`).
- Check Resources (on `HUD`).
- Make a Decision (triggers `api.js`).
- _Update State_.

5. **Ending**: Outcome determined based on resource depletion or narrative conclusion.

---

## 🚀 Installation & Setup

Follow these steps to run the frontend locally.

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Steps

1. **Clone the Repository**

```bash
git clone [https://github.com/your-username/the-corrupt-frontend.git](https://github.com/your-username/the-corrupt-frontend.git)
cd the-corrupt-frontend

```

2. **Install Dependencies**

```bash
npm install
# or
yarn install

```

3. **Run Development Server**

```bash
npm run dev

```

4. **Open in Browser**
   Visit `http://localhost:5173` (or the port shown in your terminal).

---

## 👥 The Team

System Architects behind **The Corrupt**:

- **Frontend Engineering**: Farrel Ghzoy Affifudin (FarrelGhozy)
- **Backend Architecture**: Fatih Jawwed Al Mumtaz (jaweed3)
- **Narrative Design**: Rifda (rifdazahrina)
- **Integrator Project**: Syahan Syah (shahansyah)

---

<p align="center">
Made with ❤️ and ☕ for the Future of Estambor.
</p>
