//need to be "type": module

import dotenv from "dotenv" 
import express from "express"
import helmet from "helmet"
import morgan from "morgan"
import cors from "cors"
import userRoutes from './apps/users/routes/userRoutes.js'; 
import flashcardRoutes from './apps/flashcards/routes/flashcardRoutes.js';
import { connectDb } from "./utils/connectDb.js"
import cookieParser from "cookie-parser"


dotenv.config();
const app = express()
const PORT = process.env.PORT;

app.use(express.json()) // To convert data to json to send to client
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000" || "vercel",
    credentials: true
}))//cors headers to communicate with client in the web
app.use(helmet()); //This is a security middleware that can help protect the app
app.use(morgan("dev")) //logs the requests in the console


connectDb(); // Connect to the database

app.use('/api/users', userRoutes )
app.use('/api/flashcards', flashcardRoutes)

app.listen(PORT, () => {
    console.log("Server started on port "+PORT)
})