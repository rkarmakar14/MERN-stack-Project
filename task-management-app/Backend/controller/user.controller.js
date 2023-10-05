const asyncHandler = require('express-async-handler')
const users = require('../models/model.user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const postRegister = asyncHandler(async(req,res) => {

    const {name, username, password} = req.body
        console.log(`hi`)
    if(!(name && username && password)){
        res.status(401)
        throw new Error(`All Fields are mandatory`)
    }
    const data = await users.findOne({username})
    console.log(data)
    if(data){
            res.status(400)
            throw new Error(`User is already register`)
        }
        const new_password = await bcrypt.hash(password,10)
        console.log(new_password)
        const new_data = await users.create({
            name,
            username, 
            password: new_password,
        })
        res.status(200).json({
            message: `Register successful`,
            name:new_data.name,
            userusername:new_data.username
        })
})


const userLogin = asyncHandler(async(req, res) => {
    const {username, password} = req.body
    //if input is not there then throw err
    if(!(username && password)){
        res.status(400)
        throw new Error('username and password are required')
    }
    // store the data in a variable
    const data = await users.findOne({username})
    // if data find then comapre the password if not the throw an error
    if(!data){
        res.status(400)
        throw new Error(`username id does not exists`)
    }
    const secret = process.env.ACCESS_TOKEN
    // encrupt the password and store it in a variable
    if(data && await bcrypt.compare(password, data.password)){
    // creating jwt token after comparing the bcrypt password
        const token = jwt.sign(
            {
                data:{
                    id:data.id,
                    username:data.username,
                    password:data.password
                }
            }, secret,
            {
                expiresIn: '2h'
            }
        )
        res.status(200).json(
            {
                message:`User login Succesfully`,
                userId : data._id,
                AccessToken : token,
            }
        )
    }
    else{
        res.status(401)
        throw new Error(`User is not Authorized`)
    }
})

const getcurrentbyId = asyncHandler(async() => {
    asyncHandler(async(req,res) => {
        const data = await users.findById(req.params.id)
        console.log(data)
        res.status(200).json({
            message:`This current User`,
            User_deatils:data,
        })
        res.status(200).json(`This is current user`)
    })
})


module.exports = {postRegister, userLogin, getcurrentbyId}
