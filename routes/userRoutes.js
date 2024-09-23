import express from 'express'
import { verifyToken } from '../middleware/authMiddlewares.js'
import { authorizeRoles } from '../middleware/rolesMiddleware.js'

const userRouter = express.Router()

userRouter.get('/admin' , verifyToken, authorizeRoles('admin') ,(req,res)=>{
    res.json({
        message:"Welcome Admin"
    })
})

userRouter.get('/user' , verifyToken, authorizeRoles('user') , (req,res)=>{
    res.json({
        message:"Welcome User"
    })
})

export default userRouter