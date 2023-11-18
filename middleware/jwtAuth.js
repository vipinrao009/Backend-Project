const JWT = require('jsonwebtoken')

const jwtAuth =(req,res,next)=>{

    //Step)1 : cookie se user ka data nikalker token me store karo
    const token = (req.cookies && req.cookies.token) || null
    if(!token)
    {
        res.status(400).json({
            success:false,
            message:"Not authorized!!"
        })
    }
    
    //Step 02: verify karo token ko ki db me exist karata hai nahi
    try {
        const payLoad = JWT.verify(token,process.env.SECRET)
        req.user = {id:payLoad.id, email:payLoad.email}
    } catch (error) {
        res.status(400).json({
            success:false,
            message:"Not Authorized!!!"
        })
    }
    next()
}

module.exports = jwtAuth;