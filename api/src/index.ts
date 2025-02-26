import express from "express";
import "dotenv/config";
import cors from "cors";
import { router } from "./router/router";


const app=express();
app.use(express.json())
app.use(cors())

app.use('/', router)

const port = process.env.PORT;


app.listen(port,()=>{
    console.log(`Server running: ${port}`)
})