import { Router } from 'express';
import jwt from 'jsonwebtoken';
import prismaClient from '../prismaClient';

const router = Router();
const JWT_SECRET = "hackathonProject";

// Middleware to get userId from token
const getUserIdFromToken = (token: string) => {
    try {
        const decoded: any = jwt.verify(token, JWT_SECRET);
        return decoded.userId;
    } catch (err) {
        throw new Error('Invalid token');
    }
};
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyNTRjNTRhZi03OTU1LTQ2YjMtODZjOC01OTQxZjA4ZDAwMTYiLCJpYXQiOjE3MjQ4NDk3OTN9.qJbIwlFPNVvqfOMHk9q14UnUjqv6A53riObPm5jtwts

// Create a new multisig wallet with hardcoded public keys
router.post('/newWallets', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header

    if (!token) return res.status(401).send('No token provided');

    try {
        const userId = getUserIdFromToken(token);

        // Hardcoded public keys and threshold
        const threshold = 2;
        const publicKeys = [
            "F9FEWcqQNUp2id8SAqsgudGTM8njXNNztgyFfsYEvBD6",
            "Fe5h37ZMydaJcGCibG4VshSwusjBDug9EuXMr4hnB3XF",
            "8CbRAwLG4SXWJcALVR1GweR8z4YPyiXXPBTTKbfT9P6U"
        ];

        // Create wallet with the fixed threshold and hardcoded members
        const wallet = await prismaClient.wallet.create({
            data: {
                threshold,
                owner: { connect: { id: userId } },
                users: {
                    connect: publicKeys.map(key => ({ walletAddress: key }))
                }
            }
        });

        res.status(201).json(wallet);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating wallet');
    }
});

export default router;
