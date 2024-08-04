const jwt=require("jsonwebtoken");

const validateJWTToken=(req,res,next)=>{
    try{
        const token=req.headers.authorization.split(" ")[1];
        const decoded=jwt.verify(token,process.env.SecretKey);
        req.body.userId=decoded.userId;
        next();

    }catch(error){
        res.status(400).send({message:"invalid Token"});
    }
}

module.exports={
    validateJWTToken,
}