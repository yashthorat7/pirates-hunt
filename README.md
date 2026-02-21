# 🏴‍☠️ Pirates Hunt

<p align="center">
  <img src="frontend/assets/logo.png" alt="Pirates Hunt Screenshot" width="100%">
</p>

A neat and clean, **mobile-only** lightweight game that takes you on a high-seas adventure!  
**Pirates Hunt** features **10 unique mini-games** themed around the _Pirates of the Caribbean_, offering an engaging **2-hour** gameplay experience.

## ✨ Features

- 🏴‍☠️ **10 Themed Mini-Games**: Dive into distinct challenges inspired by the pirate world.
- 📱 **Mobile-First Design**: Exclusively optimized for mobile devices for the best on-the-go experience.
- ⚡ **Lightweight & Fast**: Built for speed and performance, ensuring smooth gameplay on any device.
- ⏳ **2-Hour Adventure**: A complete, immersive story arc that fits perfectly into your schedule.
- 🧩 **Interactive Puzzles**: Test your wits with puzzles that require cunning and strategy.
- 🏆 **Rewarding Gameplay**: Complete the hunt to uncover the ultimate pirate treasure.
- 🎨 **Neat & Clean UI**: A polished, distraction-free interface that keeps you focused on the game.

## 🎮 The Adventures

Embark on a journey through 10 treacherous islands, each guarding a piece of the ultimate treasure.

| Island       | Game Type         | Description                                                       |
| :----------- | :---------------- | :---------------------------------------------------------------- |
| **Sparrow**  | 🧩 Jigsaw Puzzle  | Piece together the torn map to begin your legendary journey.      |
| **Redbay**   | 🔄 Count 360      | A dizzying challenge defying the laws of physics and perception.  |
| **Sunreef**  | 🌀 Maze Run       | Navigate the treacherous labyrinth to find the hidden exit.       |
| **Ironbay**  | 🪨 Stone Jump     | Leap across floating debris to reach the other side safely.       |
| **Blackto**  | 📝 Word Puzzle    | Decipher ancient pirate riddles to unlock the next path.          |
| **Stormy**   | 🔲 Sliding Puzzle | Arrange the scattered tiles to reveal the secret passage.         |
| **Goldbay**  | 👻 Ghost Search   | Find the invisible spirits haunting the deck of the ship.         |
| **Darkbay**  | 🐮 Bulls & Cows   | Crack the captain's secret code combination to open the chest.    |
| **Skullis**  | 💎 Treasure Hunt  | Locate the hidden loot buried deep within the cursed cave.        |
| **Victory**  | 🏆 Victory        | Claim the ultimate prize and prove your worth as the Pirate King! |

## 📂 Directory Structure

```
🌟 Pirates-Hunt/
├── 📂 backend/                    # Node.js Server & API
│   ├── 📂 config/                 # DB & Server configuration
│   ├── 📂 controllers/            # 🎮 Game Logic Handlers
│   │   ├── 📜 getSparrow.js       # Jigsaw logic
│   │   ├── 📜 getRedbay.js        # Count 360 logic
│   │   └── 📜 ... (9 total)       # Individual island handlers
│   ├── 📂 data/                   # JSON game data & assets
│   ├── 📂 routes/                 # 🛣️ API Endpoints
│   │   ├── 📜 getGame.js          # Core game routes
│   │   ├── 📜 getHint.js          # Hint system routes
│   │   └── 📜 getWin.js           # Victory routes
│   ├── 📜 .env.example            # Env template
│   └── 📜 server.js               # Entry point
│
├── 📂 frontend/                   # Web Application
│   ├── 📂 assets/                 # 🎨 UI Resources
│   │   ├── 📂 fonts/              # Custom pirate typography
│   │   ├── 📂 images/             # Global UI elements
│   │   └── 📂 [island_names]/     # Game-specific sprites
│   ├── 📂 common/                 # ⚙️ Core Logic
│   │   ├── 📜 api.js              # Fetch wrappers
│   │   ├── 📜 connect.js          # Server sync
│   │   └── 📜 hint.js             # Hint UI logic
│   ├── 📂 intro/                  # Prologue sequence
│   ├── 📂 outro/                  # Epilogue sequence
│   ├── 📂 puzzles/                # 🧩 Game Interfaces
│   │   ├── 📂 sparrow/            # Jigsaw UI
│   │   ├── 📂 redbay/             # Count 360 UI
│   │   └── 📂 ... (9 total)       # Island game modules
│   ├── 📂 victory/                # Win screen
│   └── 📜 index.html              # Main entry
│
├── 📜 .gitignore                  # Git exclusions
└── 📜 README.md                   # Documentation
```

---

## 📄 Getting Started

Follow these simple steps to set sail with **Pirates Hunt**:

### 1️⃣ Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/yashthorat7/Pirates-Hunt.git
```

### 2️⃣ Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd Pirates-Hunt/backend
npm install
```

1. **Set Up Environment Variables**:

Copy the example file and configure it:
```bash
cp .env.example .env
```
Modify `.env` with your local settings:

| Variable | Description | Example |
| :------- | :---------- | :------ |
| **PORT** | Backend server port | `3000` |
| **DATABASE_URL** | PostgreSQL connection string | `postgres://user:pass@localhost:5432/db` |
| **ALLOWED_ORIGINS** | CORS allowed origins (comma-separated) | `https://pirateshunt.vercel.app` |

2. **Start the Server**:

```bash
npm run dev
```

### 3️⃣ Frontend Setup

The frontend is a lightweight static application. You can serve it using any static file server or simply open the file directly (though a server is recommended for API calls):

```bash
# Navigate to frontend
cd ../frontend

# Open index.html in your mobile browser or use a local server
# e.g., with Python: python -m http.server
```

## 🛠️ Technologies

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (Mobile-First)
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Key Libraries**: `cors`, `dotenv`, `pg`, `nodemon`

## ❤️ Developed By

👨‍💻 **Yash Thorat**  
Feel free to suggest improvements or report issues!

⭐ Don't forget to **star** this repository if you find it useful!
