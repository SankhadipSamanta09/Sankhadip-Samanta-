<div align="center">

<br/>

```
🚌  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  🚌
      K I S K U   T R A V E L S   /   B U S   D R I V E R
🚌  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  🚌
```

### *"Across the red soil of the east • A nostalgic highway journey"*

<br/>

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini-AI-FF6D00?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-orange?style=for-the-badge)](LICENSE)

<br/>

> **NATIONAL HIGHWAY 114A / NH-34 · ALL INDIA PERMIT · REG NO. JH-04-A-2024**

</div>

---

## 🛣️ About The Project

**Kisku Travels** is an immersive, nostalgia-drenched web experience that puts you in the driver's seat of an iconic Indian state highway bus. Roll through the red soil roads of eastern India — from the dusty corridors of **Dumka** to the busy terminals of **Kolkata Esplanade** — with an atmospheric highway simulation unlike any other.

This is not just an app. It's a **love letter to the golden era of Indian bus travel** — the crackle of an air horn, the smell of kulhad chai, the stamped paper ticket, the marigold garlands on the dashboard, and the conductor's eternal cry:

> 💬 *"Aage cholo! Aage Cholo! Bhitore sob khali!"*

---

## ✨ Features

| Feature | Description |
|---|---|
| 🖼️ **Dynamic Highway Canvas** | A fully animated highway scene that reacts to speed, time of day, and weather conditions |
| 🌅 **Time of Day System** | Seamlessly toggle between **Day**, **Golden Hour**, and **Night** atmospheres |
| 🌧️ **Rain & Wiper Simulation** | Toggle live rain effects with animated windscreen wipers |
| 📟 **Driver's Dashboard Console** | Control your speed, horn, weather, and all bus systems from an authentic cabin HUD |
| 📯 **Air Horn ('Paapo') with Reactions** | Blast the pneumatic horn and watch passengers shout back in Bengali/Santali! |
| 🎵 **Glassmorphic Music Player** | Curated highway playlist with YouTube integration — old-school folk & retro Bengali hits |
| 🎫 **Ticket Generator** | Generate your own authentic punched paper bus ticket from Dumka to Esplanade |
| 📖 **Memories Drawer** | A nostalgic archive of highway culture — steering wheels, conductor pouches, agarbatti rituals |
| 💬 **Rotating Quote Ticker** | Scrolling banner of authentic driver, conductor & passenger dialogue |
| 🛤️ **Live Route Tracker** | Real-time distance display across 6 iconic highway stops |

---

## 🗂️ Project Structure

```
Sankhadip-Samanta-/
│
├── 📁 src/
│   ├── 📁 components/
│   │   ├── 🎨 HighwayCanvas.tsx     # The animated highway background (the heart of the app)
│   │   ├── 🕹️  Dashboard.tsx         # Driver's control console — speed, horn, time, weather
│   │   ├── 🎵 MusicPlayer.tsx       # Glassmorphic music player with YouTube embed
│   │   ├── 🎫 TicketGenerator.tsx   # Generates printable old-school paper bus tickets
│   │   ├── 📖 MemoriesDrawer.tsx    # Nostalgic archive of highway Indianica
│   │   └── 💬 QuoteTicker.tsx       # Scrolling marquee of conductor/driver/passenger quotes
│   │
│   ├── 📁 data/
│   │   └── 📄 mockData.ts           # All quotes, route stops, playlist tracks & memory cards
│   │
│   ├── 📁 utils/
│   │   └── 🔊 soundEngine.ts        # Web Audio API engine for horn, engine & ambient sounds
│   │
│   ├── 📄 types.ts                  # TypeScript interfaces (Quote, Ticket, TrackInfo, RouteStop)
│   ├── 📄 App.tsx                   # Root application — orchestrates all state & components
│   ├── 📄 main.tsx                  # React entry point
│   └── 📄 index.css                 # Global styles & Tailwind base
│
├── 📁 assets/                       # Static assets & AI Studio config
├── 📄 index.html                    # HTML shell
├── 📄 vite.config.ts                # Vite + React plugin configuration
├── 📄 tsconfig.json                 # TypeScript configuration
├── 📄 .env.example                  # Environment variable template
└── 📄 package.json                  # Dependencies & scripts
```

---

## 🚏 Route Map

The virtual journey covers **6 iconic stops** across eastern India:

```
🚌 Dumka Bus Stand ────── Kolkata Esplanade ────── Bandel Junction
    (0 km / ₹0)           (24 km / ₹20)            (48 km / ₹45)
         │
         ▼
   Bardhaman Station Mor ──── Deoghar Crossing ──── Ranchi Kantatoli
       (102 km / ₹80)          (140 km / ₹110)       (280 km / ₹210)
```

---

## 🎶 Highway Playlist

Three curated playlists keep the cab filled with sound:

1. 🎧 **Kisku Driver Highway Special** — Nostalgic Folk & Highway Hits
2. 🎧 **Red Soil Highway Driver Hits** — Retro Bengal & Santali Folk
3. 🎧 **Windshield Cassette Tape Groove** — Highway Folk Orchestra (Dumka to Esplanade Night Line)

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** `v18+`
- **npm** or **yarn**
- A **Gemini API Key** (for AI features)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/SankhadipSamanta09/Sankhadip-Samanta-.git
cd Sankhadip-Samanta-

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Add your GEMINI_API_KEY to .env

# 4. Start the dev server
npm run dev
```

The app will be running at **`http://localhost:3000`** 🚌💨

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | TypeScript type-check |
| `npm run clean` | Remove build artifacts |

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory based on `.env.example`:

```env
# Required: Your Google Gemini API Key
GEMINI_API_KEY="your_gemini_api_key_here"

# Auto-injected by AI Studio at runtime (Cloud Run URL)
APP_URL="your_app_url_here"
```

> **Note:** On Google AI Studio, these secrets are automatically injected at runtime. No manual setup needed when deployed there.

---

## 🧰 Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| ⚛️ **React** | `^19.0.1` | UI Framework |
| 📘 **TypeScript** | `~5.8.2` | Type Safety |
| ⚡ **Vite** | `^6.2.3` | Build Tool & Dev Server |
| 🎨 **Tailwind CSS** | `^4.1.14` | Utility-First Styling |
| 🤖 **@google/genai** | `^2.4.0` | Gemini AI Integration |
| 🎬 **Motion** | `^12.23.24` | Smooth Animations |
| 🪟 **Lucide React** | `^0.546.0` | Icon Library |
| 🌐 **Express** | `^4.21.2` | Backend Server |
| 🔑 **dotenv** | `^17.2.3` | Environment Variables |

---

## 🎨 Design Philosophy

> *Every interface element reflects the soul of an Indian highway bus.*

- **🟤 Color Palette** — Deep sepia browns, burnt oranges, and red-soil earthy tones mirroring NH-114A
- **🌫️ Glassmorphism** — Frosted glass overlays that feel like dusty cabin windows
- **✨ Micro-animations** — Every button, horn, and wiper has a tactile, physical feel
- **📟 Immersive UI** — The dashboard is not a UI — it IS the bus cabin
- **🌆 Dynamic Atmosphere** — Day, golden hour, and night completely transform the entire scene
- **📝 Typography** — Bold, italic uppercase headings with serif body text — road sign meets travel diary

---

## 🧠 Architecture Overview

```
App.tsx (State Orchestrator)
    │
    ├── HighwayCanvas  ─── Canvas animations, weather, parallax scrolling
    │
    ├── Dashboard ─────── Speed control, time toggle, rain/wiper, horn, route display
    │
    ├── MusicPlayer ───── YouTube IFrame embed, custom glassmorphic player UI
    │
    ├── TicketGenerator ─ Printable PDF-style ticket with punch marks
    │
    ├── MemoriesDrawer ── Slide-in drawer with cultural memory cards
    │
    └── QuoteTicker ───── Auto-rotating marquee of authentic driver/conductor dialogue

soundEngine.ts ────────── Web Audio API, oscillators & noise buffers for ambient sounds
```

---

## 🌄 Roadmap

- [ ] 🗺️ Interactive route map with live GPS-style position tracker
- [ ] 🌐 Multilingual support (Bengali, Hindi, Santali, English)
- [ ] 🎙️ AI Gemini-powered "Conductor" chatbot for interactive conversations
- [ ] 🌓 Responsive mobile layout optimized for on-the-go viewing
- [ ] 🎭 Passenger story generator with Gemini AI backstories
- [ ] 🖨️ Ticket download as real PNG/PDF printout
- [ ] 🌧️ More weather effects: fog, dust storms, night rain
- [ ] 🎵 Offline audio engine with recorded highway ambient sounds

---

## 🙏 Cultural Acknowledgements

This project is an homage to the **bus drivers, conductors, and passengers** of eastern India — particularly the **NH-114A** red soil highway corridor spanning **Jharkhand and West Bengal**. The dialogues, place names, routes, and rituals are drawn from real cultural memory:

- 🙌 The **Kisku** surname honors the **Santali indigenous community** of Jharkhand & West Bengal
- 🛤️ **NH-34 / NH-114A** — the real national highway connecting Dumka to Kolkata
- 🍵 **Kulhad chai** at the dhaba — a real mid-journey bus tradition
- 🌼 **Genda Phool & Agarbatti** — the daily driver's blessing ritual before the first trip
- 🎟️ **Mechanical ticket punchers** — a fading artifact of the Indian state bus transport era

---

## 👨‍💻 Author

<div align="center">

**Sankhadip Samanta**

[![GitHub](https://img.shields.io/badge/GitHub-SankhadipSamanta09-181717?style=for-the-badge&logo=github)](https://github.com/SankhadipSamanta09)

*Built with ❤️ and a deep love for Indian highway culture*

</div>

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use, modify, and share.

---

<div align="center">

```
🚌  ─────────────────────────────────────────────────  🚌
   "Every ticket is a story, every mile a memory."
    ─ A Passenger on the Dumka to Ranchi Night Line
🚌  ─────────────────────────────────────────────────  🚌
```

**⭐ Star this repo if it gave you a rush of highway nostalgia! ⭐**

*PAAPO-PAAPO! 📯 Kisku Express has no time to slow down!*

</div>
