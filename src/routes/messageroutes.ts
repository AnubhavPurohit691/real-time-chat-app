import express from "express"
const router = express.Router()
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

router.post("/usercreate",async(req,res)=>{
    const {fullName,email,password}:{fullName:string,email:string,password:string}=req.body
    const user=await prisma.user.create({
        data:{
            fullName:fullName,
            email:email,
            password:password
        }
    })
    res.json({message:user})

})
interface user {
    userId:number
}

router.post("/messagesend/:id",async(req,res)=>{
    const {userId} = req.query
    const id=req.params
    const body=req.body
    
    let conversation =await prisma.conversation.findFirst({
        where:{
            participantsId:{
                hasEvery:[Number(userId),Number(id)]
            }
        }
    })
    if(!conversation){
         conversation= await prisma.conversation.create({
            data:{
                participantsId:{
                    set:[Number(userId),Number(id)]
                }
            }
         })
    }
    
    const message=await prisma.message.create({
        data:{
            body:body,
            conversationId:conversation.id,
            senderId:Number(userId)
        }
    })

    res.json({
        message:message,
        conversation:conversation,
    })

})

export default router