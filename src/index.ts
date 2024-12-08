import express from "express"
import userrouter from "./routes/messageroutes"
const app= express()
app.use(express.json())

app.use("/",userrouter)


app.listen(8000)