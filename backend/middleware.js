const jwt = require("jsonwebtoken")
const {jWT_SECRET} = require("./config")
const authMiddleware = (req,res,next) =>{
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({});
    }

    const token = authHeader.split(' ')[1];

    try{
        const decode = jwt.verify(token,jWT_SECRET)
        req.userId = decode.userId
        next();
    }catch(err) {
        return res.status(404).json({
            message : "User does not exit"
        });
    }

}

module.exports = authMiddleware
