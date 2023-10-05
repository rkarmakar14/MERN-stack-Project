const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const secret = process.env.ACCESS_TOKEN
const validateToken = asyncHandler(async(req, res, next) =>{
    let token;
    let authToken = (req.headers.authorization ||req.headers.Authorization)
    if(authToken && authToken.startsWith('Bearer')){
        token = authToken.split(' ')[1]
        jwt.verify(token,secret,(error, decoded) =>{
            //if find error then throw a error with a message
                if(error){
                    res.status(401)
                    throw new Error(`Unauthorized Token`)
                }
                req.Users = decoded.data
                next()
        })
    }

    if(!token){
        res.status(400)
        throw new Error(`Empty token`)
    }
})

module.exports = validateToken