## SMART CONTRACT REPOSITORY. https://github.com/cnerylozada/hack2build_contracts

# 🌱 HempSat Dashboard

[![Deploy on Vercel](https://vercel.com/button)](https://hempsat.app/)

HempSat is a **next-generation agricultural telemetry and advisory platform** built during Hack2Build.  
It combines **satellite data**, **plot-level insights**, and **blockchain-enabled wallet integration** into one clean, extensible dashboard.

---

## ✨ Features

### 📡 AdviceCard
- Accepts dynamic inputs (`et0`, `rainfall`, `forecastRain`) instead of hardcoded values.  
- Provides **real-time irrigation advice** with fallback messaging.  
- Modular — satellite/weather developers can plug in their APIs directly.  

### ⚡ Telemetry
- Displays **wallet connection status** (Connected / Not connected).  
- Logs connection info (address + timestamp) to console + localStorage.  
- Extensible: add your own logic via `onConnect` (e.g., push wallet activity to backend).  

### 🔗 Wallet Connect
- Powered by **thirdweb**.  
- Supports MetaMask and Core wallet.  
- Authentication flow ready for secure API integrations.  

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Clone the repository
```bash
git clone https://github.com/edutechtourism/Hack2Build.git
cd Hack2Build
Install dependencies
bash
Copy code
npm install
Environment variables
Create a .env.local file in the project root:

env
Copy code
AUTH_PRIVATE_KEY=your_private_key_here
THIRDWEB_SECRET_KEY=your_secret_key_here
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=your_client_id_here
(These are already .gitignored and will not be pushed to GitHub.)

Run locally
bash
Copy code
npm run dev
Visit http://localhost:3000.

🌍 Deployment
We deploy on Vercel.
The app is live here: hempsat.app ✅

👩‍💻 Development Workflow
Work on feature branches (e.g., feature/advice-telemetry).

Open a Pull Request for review before merging into develop.

Protected keys/secrets are managed in Vercel Environment Variables.

🛠️ Tech Stack
Next.js 15 (App Router)

thirdweb (Wallet + Auth)

React Query (Data fetching & caching)

Tailwind CSS (Styling)

🏆 Hackathon Context
This project was built during Hack2Build to showcase:

🚀 Clean modular UI ready for API integration

📡 Satellite & plot telemetry support

🌱 Practical agricultural advisory logic

🔗 Blockchain-enabled interactions

👥 Team
Collin Petersen – Artist & AR Game Dev, frontend integration

Grim – Backend & blockchain dev

Contributors – Satellite API + Plot telemetry devs

📜 License
MIT License — open for collaboration and extension.
