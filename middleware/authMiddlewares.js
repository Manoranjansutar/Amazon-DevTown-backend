import jwt from 'jsonwebtoken'
import 'dotenv/config'

const verifyToken = async(req,res,next) =>{
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization
    if(authHeader && authHeader.startsWith('Bearer')){
        token = authHeader.split(' ')[1]
    }

    if(!token){
        return (
            res.json({
                success:false,
                message:"No token , Authorization denied"
            })
        )
    }

    try {
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decode;
        console.log("decoded user is:",req.user)
        next();
    } catch (error) {
        console.log(error)
        res.json({
            success:false,
            message:"invalid token"
        })
    }
}

export { verifyToken }