import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

import userRoutes from './apps/users/routes.js'
import fileRoutes from './apps/studyMaterials/routes.js'
import quizRoutes from './apps/quizzes/routes.js'
dotenv.config()

const app = express()
const PORT = process.env.PORT
const allowedOrigins = [process.env.CLIENT_URL]

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())

// Health check
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'API is running!'
    })
})

// APIs
app.use('/api/auth', userRoutes)
app.use('/api/files', fileRoutes)
app.use('/api/quiz', quizRoutes)

app.listen(PORT, ()=> {
    console.log(`Server is running on http://localhost:${PORT}`)
})