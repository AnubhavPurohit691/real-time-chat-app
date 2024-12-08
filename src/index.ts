import express from "express"
import userrouter from "./routes/messageroutes"
const app= express()
const path = require("path")
app.use(express.json())

app.use("/",userrouter)
app.get("/:id",(req,res)=>{
   const id =  req.params
   console.log(id)
   res.json({id:id})
})

app.listen(8000)