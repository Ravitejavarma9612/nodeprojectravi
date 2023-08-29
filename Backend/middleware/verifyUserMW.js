const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyUser = (req,res,next)=>{
    let authHeader = req.headers.authorization;
    if(!authHeader) return res.sendStatus(401);
    else{
        const token = authHeader.split(" ")[1];
        jwt.verify(token,process.env.ACCESS_TOKEN,
            (err,decoded)=>{
                if(err) return res.sendStatus(401);
                req.user = decoded.username;
                next();
            });
    }
}

module.exports= verifyUser;