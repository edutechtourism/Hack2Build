## SMART CONTRACT REPOSITORY. https://github.com/cnerylozada/hack2build_contracts

📜 Hack2Build Smart Contracts

This repository contains all on-chain logic for the Hack2Build project.
It is separated from the frontend/monorepo to ensure clear boundaries between smart contracts and application logic.

📂 Repository Structure
hack2build-contracts/
│
├── contracts/            # Solidity smart contracts
│   ├── HempSatToken.sol  # Example ERC20/utility token
│   ├── AdviceRegistry.sol# Stores and retrieves advice entries
│   └── Telemetry.sol     # Records telemetry events from connected wallets
│
├── scripts/              # Deployment & interaction scripts
│   ├── deploy.js
│   └── verify.js
│
├── test/                 # Hardhat/Foundry test cases
│   ├── HempSatToken.test.js
│   └── AdviceRegistry.test.js
│
├── hardhat.config.js     # Hardhat configuration
├── package.json          # NPM dependencies (ethers, hardhat, chai, etc.)
└── README.md             # Documentation

🚀 Getting Started
1. Install dependencies
npm install

2. Compile contracts
npx hardhat compile

3. Run tests
npx hardhat test

4. Deploy to Avalanche Fuji (testnet)

Create a .env file with:

PRIVATE_KEY=your_wallet_private_key
RPC_URL=https://api.avax-test.network/ext/bc/C/rpc
ETHERSCAN_API_KEY=your_key   # for verification


Then:

npx hardhat run scripts/deploy.js --network fuji

🔑 Core Contracts
HempSatToken.sol

ERC20 utility token.

Used for incentivizing data providers (satellite + field devs).

AdviceRegistry.sol

Stores irrigation/weather advice for specific plots.

Advice can be submitted by approved oracle providers.

Telemetry.sol

Records telemetry events such as wallet connections, plot updates, or satellite data logs.

Optional hooks for off-chain indexing.

🧪 Testing

Unit tests written in Mocha/Chai (default Hardhat).

Coverage report available via npx hardhat coverage.

📡 Deployment Plan

Fuji Testnet for Hackathon demo.

Later upgrade to Avalanche Subnet for scalability.

🛠 Tech Stack

Solidity (0.8.x)

Hardhat (deployment + testing)

Ethers.js (interactions)

Avalanche Fuji testnet

🤝 Contribution

Create a new branch: feature/contract-name

Submit PR → reviewed by core devs.

⚡ This repo keeps the blockchain logic modular and separate from the UI (in the main Hack2Build monorepo).
That way, frontend devs can consume deployed contract addresses & ABIs without touching Solidity.
