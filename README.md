# CyberQuest: Playable 3D Cyber & AI Portfolio

> An interactive 3D WebGL cyberspace environment built as a playable portfolio for Asmaa Belkerrouche — AI & Cybersecurity Student at ESTIN Higher School and Web & Desktop Software Developer.

[Live Demo](https://an-interactive-3-d-protfolio-jwnpmrt5d.vercel.app/) | [LinkedIn Profile](https://www.linkedin.com/in/asma-belkerrouche-5a9365260/) | [GitHub Profile](https://github.com/amsaqeeus)

---

## Overview

CyberQuest replaces standard static resume templates with a real-time, gamified 3D cyberpunk world. Visitors spawn as an operative avatar in a futuristic command platform, navigating freely between interactive holographic stations, sound generators, and security minigames.

The application also features a dual-mode architecture: users can instantly toggle between the immersive 3D Game World and a retro CRT Classic Dossier view, complete with one-click Markdown and JSON dossier export.

---

## Core Features

### 1. 3D World Navigation & Controls
- **Dual-Input Movement**: Navigate using WASD / Arrow keys, virtual mobile touch joystick, or mini-map click-to-teleport.
- **First/Third-Person Camera Orbit**: Click-and-drag or hold right-click to freely look around the 3D scene.
- **Avatar Physics**: Real-time velocity tracking, jump mechanics, boundary collision detection, and procedural animation states (idle, walk, jump).

### 2. Interactive Cyber Stations
- **Command Deck**: Operative status, dossier summary, technical proficiencies, and direct contact frequencies.
- **Project Hologrids**: 11 production-grade software tools categorized by domain (Cybersecurity, Desktop Applications, AI & Machine Learning, Full-Stack Web). Includes the Air Algérie Enterprise Payroll desktop application, CrackGuard.ai, SentinelIR Windows EDR platform, OSINT Multi-Target Intelligence aggregator, and SLSA supply chain risk analyzer.
- **Experience Vault**: 8 enterprise and academic leadership missions alongside active software engineering practice (initiated June 2026), detailing roles at Air Algérie, Algérienne Des Eaux, Naftal, BDL Bank, Algérie Telecom, Sirius ESTIN, and School of AI Béjaïa.
- **Skill Power Matrix**: Comprehensive breakdown of 39 verified competencies across Web & Desktop Engineering, Penetration Testing & IT Auditing, Machine Learning & Data Science, and Virtualization & Systems Administration.
- **Academy Archive**: Academic records at ESTIN Higher School and 13 verified industry certifications from Centri, Cisco Networking Academy, DataCamp, and Forage.
- **Comms Array**: Direct transmission interface for inquiries and collaboration requests.

### 3. Procedural Audio Synthesizer
- Built using the native Web Audio API with zero external audio asset dependencies.
- Generates 8-bit procedural sound effects for footsteps, jumping, terminal access, folder inspection, and background chiptune music.
- Global mute toggle with user state persistence.

### 4. Dual-Mode Architecture & Dossier Export
- **3D Game Mode**: Full WebGL cyberpunk graphics with bloom effects, floor grid pulses, and floating holographic markers.
- **Classic CRT Mode**: Retro terminal dossier interface with simulated scanlines for quick document scanning.
- **One-Click Export**: Dynamic export engine that parses live portfolio data into downloadable Markdown or JSON resumes.

---

## Technical Arsenal

- **Frontend Framework**: React 19, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS, Orbitron & Share Tech Mono typography
- **3D & Graphics**: Custom WebGL 3D Canvas rendering engine, procedural shaders
- **Audio**: Web Audio API (real-time chiptune oscillator synthesis)
- **Icons**: Lucide React

---

## Getting Started

### Prerequisites
- Node.js (v18.0 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/amsaqeeus/cyber-quest-portfolio.git
cd cyber-quest-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open `http://localhost:3000` in your web browser.

### Production Build

To build the application for deployment:
```bash
npm run build
```

The output will be located in the `dist` directory, ready to deploy to GitHub Pages, Vercel, Netlify, or Cloud Run.

---

## Author

**Asmaa Belkerrouche**
- Role: AI & Cybersecurity Student at ESTIN Higher School | Web & Desktop Software Developer
- Location: Bouira / Béjaïa / Algiers, Algeria
- Email: a_belkerrouche@estin.dz
- LinkedIn: [linkedin.com/in/asma-belkerrouche-5a9365260](https://www.linkedin.com/in/asma-belkerrouche-5a9365260/)
- GitHub: [@amsaqeeus](https://github.com/amsaqeeus)

---

## License

This project is open source and available under the MIT License.
