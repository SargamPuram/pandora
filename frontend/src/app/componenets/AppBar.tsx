"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { WalletDisconnectButton, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
const BACKEND_URL=' http://localhost:3001'

export const AppBar = () => {
    const { publicKey, signMessage } = useWallet();
    const [hasMounted, setHasMounted] = useState(false);
    const hasSignedMessage = useRef(false); // Track if the message has been signed

    useEffect(() => {
        setHasMounted(true); // Mark the component as mounted
    }, []);

    async function signAndSend() {
        if (!publicKey || !signMessage || hasSignedMessage.current) return;

        try {
            const message = new TextEncoder().encode('Please sign in to Pandora');
            const signature = await signMessage(message);

            // Mark that the message has been signed
            hasSignedMessage.current = true;

            // Handle the signed message and signature here
            console.log("Signature:", signature);
            const response = await axios.post(`${BACKEND_URL}/userSignin`, {
                signature,
                publicKey: publicKey.toString()
            })
            console.log(response.data.token)
            localStorage.setItem("token", response.data.token);

            // You can send the signature to your backend for verification
        } catch (error) {
            console.error("Error signing message:", error);
        }
    }


    useEffect(() => {
        if (publicKey && !hasSignedMessage.current) {
            signAndSend(); // Only sign the message if it hasn't been signed yet
        }
    }, [publicKey]);

    if (!hasMounted) {
        return null; // Prevent rendering on the server by returning null until component is mounted
    }

    return (
        <div className="flex justify-between items-center w-full border-b p-1 bg-black">
            <div className="text-2xl pl-4">
                Pandora
            </div>
            <div className="text-xl pr-4">
                {publicKey ? <WalletDisconnectButton /> : <WalletMultiButton />}
            </div>
        </div>
    );
};
