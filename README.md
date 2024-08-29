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
- **Frontend**: Wallet adapter integration for user interaction. NextJS, TypeScript

## How It Works

### 1. User Authentication

Users authenticate via their wallet adapter, which connects securely to their Solana wallet. Prisma with PostgreSQL is used to manage user credentials. We are using JWT here. 

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
The contract is deployed on the Solana blockchain. The contract address is: DikY9r1rRQojX8v9jSa7eV5C4sFgBn5XyadrLUVNN635
<br> 
You can check it out at https://explorer.solana.com/tx/ctsh3Wcdd5rvTmCbBaGBm15m73cfpFGinucdvbQqgWcpDyy7UcLAJo9souUeGKekiMaizzVKQzP7zxPimfVVDTU?cluster=devnet

## How to Use
- Connect Your Wallet: Use the wallet adapter to log in.
- Create a Multisig Wallet:
- Provide public keys of members.
- Set the signature threshold.
- Submit Transactions: Propose transactions to the wallet.
- Sign Transactions: Authorized signers can sign the transactions. Once the required threshold is met, the transaction will be executed.

### Screenshots 
![Screenshot_20240829_133033](https://github.com/user-attachments/assets/017d6149-e0b5-48e1-91f5-34fa4c3df72e)
![image](https://github.com/user-attachments/assets/3b914f79-b91e-4b0b-9000-3bd69863edc7)
![image](https://github.com/user-attachments/assets/c556c35b-ff2f-4713-ae63-9ad3e3bbc81c)
![Screenshot_20240829_133358](https://github.com/user-attachments/assets/98f4c7ee-5657-4ed2-8d90-babe92d04a76)



  
## Applications
- Corporate Fund Management: Manage funds with multiple approvers securely.
- DAO Governance: Facilitate decentralized decision-making and fund management.
- Shared Asset Control: Manage assets owned by multiple parties with shared control.


Contributing
We welcome contributions to enhance this project. Please refer to CONTRIBUTING.md for contribution guidelines.

Contact
For any questions or support, please contact [Twitter](https://x.com/sargam_puram)







