const jwt=require("jsonwebtoken");

const validateJWTToken=(req,res,next)=>{
    try{
        const token=req.headers.authorization.split(" ")[1];
        const decoded=jwt.verify(token,process.env.SecretKey);
        // console.log("decoded",decoded);
        // req.body.userId=decoded.userId;
        // req.body.isAdmin=decoded.isAdmin;
        req.user={
            userId:decoded.userId,
            isAdmin:decoded.isAdmin,
            name:decoded.name,
        };
        next();

    }catch(error){
        res.status(400).send({message:"invalid Token"});
    }
}

module.exports={
    validateJWTToken,
}