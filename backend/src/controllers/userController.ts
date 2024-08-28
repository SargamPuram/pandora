import { Request, Response } from 'express';
import prisma from '../prismaClient';

export const loginUser = async (req: Request, res: Response) => {
  const { walletAddress } = req.body;

  try {
    // Check if user exists; if not, create a new user
    let user = await prisma.user.findUnique({
      where: { walletAddress },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          walletAddress,
        },
      });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to log in user', error });
  }
};
