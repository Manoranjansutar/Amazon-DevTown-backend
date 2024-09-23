import express from 'express'
import cors from 'cors'
import { connectDB } from './config/dB.js'
import authRouter from './routes/authRoutes.js'
import userRouter from './routes/userRoutes.js'
import productRouter from './routes/productRoute.js'
import connectCloudinary from './config/cloudinary.js'

const app =express()
app.use(cors())
app.use(express.json())

connectDB();
connectCloudinary();

const PORT = 5000;

app.use('/api/auth', authRouter)
app.use('/api/users',userRouter)
app.use('/api/product' , productRouter)

app.get('/',(req,res)=>{
    res.send("API is working")
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})