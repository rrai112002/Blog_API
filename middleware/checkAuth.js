const jwt = require('jsonwebtoken')
module.exports = (req,res,next)=>{
    // console.log('from auth', req.headers.authorization)
    try{
        const token = req.headers.authorization.split(" ")[1]
        // console.log(token)
        const verify = jwt.verify(token, 'Rai123')
        // console.log(verify)
        if(verify)
        {
            next();
        }


    }
    catch(err){
        return res.status(401).json({
            msg: 'invalid token'
        })

    }
}