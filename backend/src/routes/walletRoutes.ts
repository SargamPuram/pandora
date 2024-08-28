import { Router } from "express";
import prismaClient from "../prismaClient";

const router = Router();

// Create a new wallet
router.post("/createWallet", async (req, res) => {
    const { ownerId, threshold, initialMembers } = req.body;

    if (!ownerId || threshold === undefined || threshold <= 0) {
        return res.status(400).json({ message: "Invalid data" });
    }

    try {
        // Create the wallet
        const wallet = await prismaClient.wallet.create({
            data: {
                ownerId,
                threshold,
                members: {
                    create: initialMembers.map((userId: string) => ({
                        userId,
                        role: "member",
                    })),
                },
            },
        });

        res.status(201).json(wallet);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
