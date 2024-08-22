# Solana Wallet Adapter with NextAuth & Next.js App Router

This repository integrates Solana Wallet Adapter with NextAuth for authentication in a Next.js app using the App Router feature. It provides a streamlined method for users to authenticate with their Solana wallets.

## Features

- **Next.js App Router:** Utilizes Next.js App Router for routing and API handling.
- **NextAuth:** Seamlessly integrates NextAuth for user authentication.
- **Solana Wallet Adapter:** Supports multiple Solana wallets, including Phantom and Backpack, for user login.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following:

- Node.js
- A Solana wallet (e.g., Phantom or Backpack)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/rushikeshg25/Solana-Wallet-Adapter-NextAuth-App-Router.git
   ```
2. Copy .env.example to .env:

   ```bash
   cp .env.example .env
   ```
3. Generate String for AUTH_SECRET:

   ```bash
   openssl rand -base64 33
   ```   
4. Run the Next App:

   ```bash
   pnpm run dev
   ```
### Star this repo if you will be using this

## Contributing
   Contributions are welcome! Feel free to open issues or submit pull requests.

