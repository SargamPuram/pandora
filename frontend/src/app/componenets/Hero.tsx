"use client";
import React, { useState } from 'react';
import axios from 'axios';
import CreateWalletForm from './CreateWalletForm';

const BACKEND_URL = 'http://localhost:3001'; // Ensure this matches your backend URL

const Hero = () => {
    const [threshold, setThreshold] = useState<number>(1);
    const [participantKeys, setParticipantKeys] = useState<string[]>(['']);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleAddKey = () => {
        setParticipantKeys([...participantKeys, '']);
    };

    const handleKeyChange = (index: number, value: string) => {
        const newKeys = [...participantKeys];
        newKeys[index] = value;
        setParticipantKeys(newKeys);
    };

    const handleCreateWallet = async () => {
        const token = localStorage.getItem('token');
        
        const userId = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')!).userId : 'defaultUserId';
// Ensure this matches the `id` stored in local storage

        // if (!token || !userId) {
        //     console.error("User not authenticated");
        //     return;
        // }

        setLoading(true);
        setError(null);

        try {
            await axios.post(`${BACKEND_URL}/createWallet`, {
                ownerId: userId,
                threshold: threshold,
                participantPublicKeys: participantKeys.filter(key => key.trim() !== ''),
            });
            

            // Handle success (e.g., show a success message or update UI)
            alert("Wallet created successfully!");
        } catch (err) {
            console.error("Error creating wallet:", err);
            setError("Failed to create wallet");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center p-6 bg-black-100 rounded-lg shadow-md text-white border border-yellow-500">
            <h1 className="text-2xl font-bold mb-4 text-white-800">Create Your Wallet</h1>
            <input
                type="number"
                value={threshold}
                onChange={(e) => setThreshold(Number(e.target.value))}
                min="1"
                placeholder="Enter threshold"
                className="mb-4 p-2 w-full max-w-md border border-gray-300 rounded-md text-black"
            />
            {participantKeys.map((key, index) => (
                <div key={index} className="flex flex-col items-center">
                    <input
                        type="text"
                        value={key}
                        onChange={(e) => handleKeyChange(index, e.target.value)}
                        placeholder={`Participant Public Key ${index + 1}`}
                        className="mb-2 p-2 w-full max-w-md border border-gray-300 rounded-md text-black"
                    />
                    <button
                        type="button"
                        onClick={() => handleAddKey()}
                        className="mt-2 p-2 bg-blue-600 text-black rounded-md hover:bg-blue-600"
                    >
                        Add Another Key
                    </button>
                </div>
            ))}
            <button
                onClick={handleCreateWallet}
                disabled={loading}
                className={`mt-4 p-2 ${loading ? 'bg-gray-500' : 'bg-green-600'} text-white rounded-md ${loading ? 'cursor-not-allowed' : 'hover:bg-green-600'}`}
            >
                {loading ? "Creating..." : "Create Wallet"}
            </button>
            {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}
        </div>
        )
 }
export default Hero;
            
