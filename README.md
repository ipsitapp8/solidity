# Dividend Token & Distribution Dashboard

## **Contract Address**
**0xfD4B754db6e3416555E70Ad10203A17e8a7C9EE3**  
Explorer: https://coston2-explorer.flare.network/address/0xfD4B754db6e3416555E70Ad10203A17e8a7C9EE3

---

## **Project Description**

This project provides a complete frontend integration for a dividend-distributing ERC-20–style token deployed on the Flare Coston2 testnet.  
The smart contract supports minting, tracking balances, distributing dividends in FLR, and allowing users to withdraw their accumulated dividends.

This repository includes:

- A lightweight React/Next.js UI
- A reusable Wagmi hook (`useDividendContract`)
- Contract ABI and address bindings
- A sample dashboard that interacts directly with the contract

The system is designed for clarity, ease of use, and extension into more complex dashboards or production-ready staking/dividend applications.

---

## **Features**

### 🎯 Smart Contract Integration
- Read total supply, wallet balance, and unclaimed dividends.
- Mint new tokens to the connected wallet.
- Distribute dividends (FLR) to all token holders proportionally.
- Withdraw dividends directly to the user’s wallet.

### ⚛️ React & Wagmi Integration
- Fully typed TypeScript contract hooks.
- Realtime transaction status (pending, confirming, confirmed).
- Automatic balance/dividend refetch after confirmation.

### 🔐 Wallet Gating
- UI unlocks only when a wallet is connected.
- Protects all write interactions.

### 💬 UX Enhancements
- Error reporting
- Loading states for writes
- Fully responsive layout
- Clean dashboard-style interface

---

## **How It Solves the Problem**

Managing dividend distribution for token-based ecosystems is complex. Typical pain points include:

- Tracking on-chain balances
- Distributing proportional rewards
- Exposing clear UI for minting/rewarding/withdrawing
- Handling transaction states cleanly in the frontend

This project solves these issues by:

### ✔ **Providing a contract with built-in accounting**
The contract automatically stores user balances and accumulated dividends.

### ✔ **Enabling seamless dividend distribution**
A single call to `distributeDividends()` allocates FLR proportionally based on token share.

### ✔ **Offering clean React hooks that abstract Web3 complexity**
Developers can interact with the contract through simple JS functions:
- `mint(amount)`
- `distributeDividends(amount)`
- `withdrawDividends()`

### ✔ **Delivering a complete dashboard UI**
Users can:
- View their balance
- See how much FLR they have earned
- Mint more tokens
- Claim their dividends with one click

### ✔ **Reducing integration overhead**
All ABI, address, state management, and UI patterns are already implemented.

---

This makes the repository an ideal foundation for:
- Tokenized revenue-sharing platforms  
- Investment pools  
- Staking projects  
- Dividend-paying DAOs  
- Educational demos of smart contract revenue distribution  

---



