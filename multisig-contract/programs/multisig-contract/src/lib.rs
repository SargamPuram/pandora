use anchor_lang::prelude::*;

// This is your program's public key and it will update
// automatically when you build the project.
declare_id!("DikY9r1rRQojX8v9jSa7eV5C4sFgBn5XyadrLUVNN635");

#[program]
pub mod multisig_contract {
    use super::*;

    // Initialize the DKG state
    pub fn initialize(ctx: Context<Initialize>, threshold: u8) -> Result<()> {
        let dkg_state = &mut ctx.accounts.dkg_state;
        dkg_state.threshold = threshold;
        Ok(())
    }

    // Add a key share to the DKG state
    pub fn add_key_share(ctx: Context<AddKeyShare>, key_share: Vec<u8>) -> Result<()> {
        let dkg_state = &mut ctx.accounts.dkg_state;
        dkg_state.key_shares.push(key_share);
        Ok(())
    }

    // Retrieve key shares from the DKG state
    pub fn get_key_shares(ctx: Context<GetKeyShares>) -> Result<Vec<Vec<u8>>> {
        let dkg_state = &ctx.accounts.dkg_state;
        Ok(dkg_state.key_shares.clone())
    }

    // Create a new multisig wallet
    pub fn create_multisig_wallet(
        ctx: Context<CreateMultisigWallet>,
        signers: Vec<Pubkey>,
        threshold: u8,
    ) -> Result<()> {
        let wallet = &mut ctx.accounts.wallet;
        wallet.signers = signers;
        wallet.threshold = threshold;
        wallet.transactions = Vec::new(); // Initialize with no transactions
        Ok(())
    }

    // Submit a transaction to the multisig wallet
    pub fn submit_transaction(
        ctx: Context<SubmitTransaction>,
        instruction_data: Vec<u8>,
    ) -> Result<()> {
        let wallet = &mut ctx.accounts.wallet;
        let tx = Transaction {
            instruction_data,
            signatures: Vec::new(),
        };
        wallet.transactions.push(tx);
        Ok(())
    }

    // Sign a transaction in the multisig wallet
pub fn sign_transaction(ctx: Context<SignTransaction>, transaction_index: u64) -> Result<()> {
    // Obtain an immutable borrow of wallet to check authorization and transaction existence
    let wallet = &ctx.accounts.wallet;

    // Check if the transaction index is within bounds
    if transaction_index >= wallet.transactions.len() as u64 {
        return Err(ErrorCode::TransactionNotFound.into());
    }

    let signer = ctx.accounts.signer.key();

    // Check if the signer is authorized
    if !wallet.signers.contains(&signer) {
        return Err(ErrorCode::UnauthorizedSigner.into());
    }

    // Obtain a mutable borrow of wallet to modify the transaction
    let mut wallet = &mut ctx.accounts.wallet;
    let tx_index = transaction_index as usize;
    let tx = wallet.transactions.get_mut(tx_index).ok_or(ErrorCode::TransactionNotFound)?;

    // Mutate the transaction by adding the signature
    tx.signatures.push(signer);

    // Check if the transaction has enough signatures
    if tx.signatures.len() as u8 >= wallet.threshold {
        // Execute the transaction
        // For simplicity, this example does not include actual instruction execution
        // You can extend this to include instruction execution here
    }

    Ok(())
}


}

#[account]
pub struct DKGState {
    pub threshold: u8,
    pub key_shares: Vec<Vec<u8>>,
}

#[account]
pub struct MultisigWallet {
    pub signers: Vec<Pubkey>,
    pub threshold: u8,
    pub transactions: Vec<Transaction>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Transaction {
    pub instruction_data: Vec<u8>,
    pub signatures: Vec<Pubkey>,
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 8 + 1000)] // Adjust space as needed
    pub dkg_state: Account<'info, DKGState>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct AddKeyShare<'info> {
    #[account(mut)]
    pub dkg_state: Account<'info, DKGState>,
    pub user: Signer<'info>,
}

#[derive(Accounts)]
pub struct GetKeyShares<'info> {
    #[account()]
    pub dkg_state: Account<'info, DKGState>,
}

#[derive(Accounts)]
pub struct CreateMultisigWallet<'info> {
    #[account(init, payer = user, space = 8 + 1000)] // Adjust space as needed
    pub wallet: Account<'info, MultisigWallet>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct SubmitTransaction<'info> {
    #[account(mut)]
    pub wallet: Account<'info, MultisigWallet>,
    pub user: Signer<'info>,
}

#[derive(Accounts)]
pub struct SignTransaction<'info> {
    #[account(mut)]
    pub wallet: Account<'info, MultisigWallet>,
    pub signer: Signer<'info>,
}

#[error_code]
pub enum ErrorCode {
    #[msg("Unauthorized signer")]
    UnauthorizedSigner,

    #[msg("Transaction not found")]
    TransactionNotFound,
}
