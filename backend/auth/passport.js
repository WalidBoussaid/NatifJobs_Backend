require('dotenv').config();
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.TOKEN_SECRET;

function passport(req,res,next){
    const authHeader = req.headers['authorization'];//extrait du header authorisation
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({msgErr:"no authorization"})
    }
    jwt.verify(token,JWT_SECRET,(err,user)=>{
        if(err){
            return res.status(401).json({msgErr:"token expired"})
        }
        req.user = user;
        next();
    })
}

module.exports = passport;