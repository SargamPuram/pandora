import { PublicKey, Keypair, clusterApiUrl, Connection } from '@solana/web3.js';
import { createMultisig, TOKEN_PROGRAM_ID } from '@solana/spl-token';

// Function to display multisig wallet public key
const displayMultisigPublicKey = async (publicKeys: PublicKey[], threshold: number) => {
  // Connect to the Solana devnet
  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

  // Create a new keypair for the multisig account
  const multisigAccount = Keypair.generate();

  // Calculate the multisig account address
  const multisigPublicKey = await PublicKey.createWithSeed(
    multisigAccount.publicKey,
    'multisig',
    TOKEN_PROGRAM_ID
  );

  console.log('Generated multisig public key:', multisigPublicKey.toBase58());
};

// Example public keys (replace these with actual public keys if available)
const publicKeys = [
  new PublicKey('F9FEWcqQNUp2id8SAqsgudGTM8njXNNztgyFfsYEvBD6'),
  new PublicKey('Fe5h37ZMydaJcGCibG4VshSwusjBDug9EuXMr4hnB3XF'),
  new PublicKey('8CbRAwLG4SXWJcALVR1GweR8z4YPyiXXPBTTKbfT9P6U')
];

// Define the threshold (number of required signatures)
const threshold = 2;

// Display the multisig wallet public key
displayMultisigPublicKey(publicKeys, threshold);
