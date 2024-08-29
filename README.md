# pandora
A MultiSig Solana Wallet 
# Multisig Solana Wallet

Welcome to the Multisig Solana Wallet project! This application provides a secure and decentralized way to manage multi-signature wallets on the Solana blockchain.

## Features

- **Multisig Wallet Creation**: Create and manage a multisig wallet with specified signers and a threshold.
- **Transaction Management**: Submit and sign transactions securely.
- **Distributed Key Generation (DKG)**: Add and manage key shares for enhanced security.

## Technology Stack

- **Solana**: Blockchain platform for deploying and executing smart contracts.
- **Anchor**: Framework for Solana smart contract development.
- **Prisma & PostgreSQL**: For user authentication and credential management.
- **Frontend**: Wallet adapter integration for user interaction.

## How It Works

### 1. User Authentication

Users authenticate via their wallet adapter, which connects securely to their Solana wallet. Prisma with PostgreSQL is used to manage user credentials.

### 2. Create a Multisig Wallet

- **Add Members**: Include public keys of wallet members.
- **Set Threshold**: Define the number of signatures required to approve transactions.

### 3. Transaction Management

- **Submit Transactions**: Users can propose transactions to the multisig wallet.
- **Sign Transactions**: Authorized signers add their signatures to transactions. When the threshold is reached, the transaction is executed.

## Smart Contract Overview

The smart contract, developed using Rust and the Anchor framework, includes the following functionalities:

- **Initialize**: Sets up the DKG state and threshold.
- **Add Key Share**: Adds key shares to the DKG state.
- **Get Key Shares**: Retrieves key shares from the DKG state.
- **Create Multisig Wallet**: Initializes a new multisig wallet with specified signers and a threshold.
- **Submit Transaction**: Adds a transaction proposal to the wallet.
- **Sign Transaction**: Allows signers to add their signatures to a transaction.


### Deployment
The contract is deployed on the Solana blockchain. The contract address is:DikY9r1rRQojX8v9jSa7eV5C4sFgBn5XyadrLUVNN635
/n
/n

## How to Use
- Connect Your Wallet: Use the wallet adapter to log in.
- Create a Multisig Wallet:
- Provide public keys of members.
- Set the signature threshold.
- Submit Transactions: Propose transactions to the wallet.
- Sign Transactions: Authorized signers can sign the transactions. Once the required threshold is met, the transaction will be executed.
/n 

## Applications
Corporate Fund Management: Manage funds with multiple approvers securely.
DAO Governance: Facilitate decentralized decision-making and fund management.
Shared Asset Control: Manage assets owned by multiple parties with shared control.


Contributing
We welcome contributions to enhance this project. Please refer to CONTRIBUTING.md for contribution guidelines.

Contact
For any questions or support, please contact [Twitter](https://x.com/sargam_puram)







