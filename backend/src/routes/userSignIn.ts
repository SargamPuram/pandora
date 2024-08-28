import { Router } from "express";
import jwt from "jsonwebtoken";
import prismaClient from "../prismaClient";
import nacl from "tweetnacl";
import { PublicKey } from "@solana/web3.js";

const router = Router();

const JWT_SECRET="hackathonProject";

//signin with wallet
//signing a message 
router.post("/userSignin", async (req,res)=>{
    const { publicKey, signature}=req.body;
    const signedString = "Please sign in to Pandora";
    const message = new TextEncoder().encode('Please sign in to Pandora')

    console.log(publicKey)
    console.log(signature)
    const result = nacl.sign.detached.verify(
        message,
        new Uint8Array(signature.data),
        new PublicKey(publicKey).toBytes()

    )
    console.log(result)

    console.log("Received request at /userSignin");
    // const hardcodedWalletAddress="8CbRAwLG4SXWJcALVR1GweR8z4YPyiXXPBTTKbfT9P6U";
    const existingUser = await prismaClient.user.findFirst({
        where: {
            walletAddress: publicKey
        }
    })
    // Todo:add sigin verification address
    if(existingUser){
        const token = jwt.sign({
            userId: existingUser.id
        }, JWT_SECRET)
        res.json({
            token
        })

    }else{
        const user = await prismaClient.user.create({
            data:{
                walletAddress: publicKey
            }
        })
        const token = jwt.sign({
            userId: user.id
        }, JWT_SECRET)

        res.json({
            token
        })


    }
        
    }
)

export default router;