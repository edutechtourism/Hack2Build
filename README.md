# 🌱 HEMPsat – Regenerative Agri-Intelligence Platform  

[![Deploy on Vercel](https://vercel.com/button)](https://hempsat.app/)  

HEMPsat is a **privacy-first agri-intelligence and carbon credit platform** that unites **farmers, eco-participants, and carbon brokers** into a shared ecosystem.  

By combining **satellite MRV (Monitor, Record, Validate)**, **farmer dashboards**, and **blockchain-powered tokens ($ROOT + $HEMP)**, HempSat unlocks **income for farmers**, **eco-engagement for users**, and **verifiable offsets for brokers**.  

---

## ✨ Core Features  

### 🛰 Satellite MRV  
- Integrates **USGS & other satellites** to measure soil health, crop growth, and carbon sequestration.  
- AI-driven insights for farmers: irrigation, fertilizer, and weather recommendations.  

### 📊 Farmer Dashboard  
- Farmers can log regenerative practices (planting, composting, irrigation).  
- Land pledge system for carbon credit eligibility.  
- Privacy-first: farmers control what data is shared, with zk-proof selective visibility.  

### 🌱 Dual Token Suite  
- **$ROOT**: Seed-backed micro-reward token for farmers & eco-participants. Redeemable for heirloom seed packs.  
- **$HEMP**: ERC-20 settlement coin for carbon brokers, pegged to validated carbon credits.  

### 🛍 Marketplace  
- Farmers, users, and brokers interact in a **seamless auto-swap marketplace**.  
- Redeem seeds, farm tools, NFTs, and verified carbon credits.  

### 🔒 Privacy & Governance  
- zk-proof privacy layer for farmer data.  
- DAO governance via **$ORACL** (EERC20 privacy-voting coin).  
- Farmers gain governance rights as part of the **Pioneer Tier** (100+ acre pledges).  

---

## 🚀 Getting Started  

### Prerequisites  
- Node.js 18+  
- npm or yarn  
- Vercel (for deployment)  

### Clone the repository  
git clone https://github.com/edutechtourism/Hack2Build.git
cd Hack2Build

### Install Dependencies 
npm install

### Environment Variables
Create a .env.local file in the project root:
AUTH_PRIVATE_KEY=your_private_key_here
THIRDWEB_SECRET_KEY=your_secret_key_here
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=your_client_id_here

(These are already .gitignored and safe from accidental commits.)

### Run locally
npm run dev

Visit: http://localhost:3000

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

Avalanche (ERC-20 tokens $ROOT + $HEMP)

---

🧑‍🤝‍🧑 Team

Michael Kamp – Ecosystem Architect / Pollinator

Collin Petersen – Product Architect & Frontend Developer

Cristian Nery – Head Web2/Web3 Fullstack Dev

LM Designs 8 – Multi-sensory Design Strategist

Charles Ledbetter – Real World Asset (RWA) Consultant

---

🏆 Hackathon Context
This project was built during Hack2Build to showcase:

🚀 Clean modular UI ready for API integration

📡 Satellite & plot telemetry support

🌱 Practical agricultural advisory logic

🔗 Blockchain-enabled interactions

---

📜 License

MIT License — open for collaboration, forks, and extension.
