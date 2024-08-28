import React, { useState } from 'react';
import axios from 'axios';

const CreateWalletForm: React.FC = () => {
    const [ownerId, setOwnerId] = useState('');
    const [threshold, setThreshold] = useState<number>(1);
    const [initialMembers, setInitialMembers] = useState<string[]>([]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:3001/createWallet', {
                ownerId,
                threshold,
                initialMembers
            });
            console.log(response.data);
            // Handle successful wallet creation (e.g., redirect or display a message)
        } catch (error) {
            console.error('Error creating wallet:', error);
            // Handle error
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Owner ID:
                <input type="text" value={ownerId} onChange={(e) => setOwnerId(e.target.value)} required />
            </label>
            <label>
                Signature Threshold:
                <input type="number" value={threshold} onChange={(e) => setThreshold(parseInt(e.target.value))} required />
            </label>
            {/* Add a way to input initial members */}
            <button type="submit">Create Wallet</button>
        </form>
    );
};

export default CreateWalletForm;
