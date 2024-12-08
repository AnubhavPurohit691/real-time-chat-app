
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


router.post("/messagesend",async(req,res)=>{
    const {id,userId}=req.query
    console.log(id , userId)
    
    const {body}=req.body
    console.log(id)
    
    let conversations =await prisma.conversation.findFirst({
        where:{
            participantsId:{
                hasEvery:[Number(userId),Number(id)]
            }
        }
    })
    if(!conversations){
         conversations= await prisma.conversation.create({
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
            conversationId:conversations.id,
            senderId:Number(userId)
        }
    })

    res.json({
        message:message,
        conversation:conversations,
    })

})

export default router