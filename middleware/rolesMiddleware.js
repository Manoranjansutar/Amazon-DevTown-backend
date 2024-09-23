const authorizeRoles = (...allowedRoles) =>{
   return(req,res,next) => {
     if(!allowedRoles.includes(req.user.role)){
        return(
            res.json({
                success:false,
                message:"access denied"
            })
        )
     }
     next()
   }
}

export {authorizeRoles}