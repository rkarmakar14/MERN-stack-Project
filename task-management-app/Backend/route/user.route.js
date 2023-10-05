const express = require('express')
const{userLogin, getcurrentbyId, postRegister} = require('../controller/user.controller')
const validateToken = require('../middleware/validateToken')
const myUserRoute = express.Router()

myUserRoute.route('/register').post(postRegister)
myUserRoute.route('/login').post(userLogin)
myUserRoute.route('/home').get(validateToken,getcurrentbyId)

module.exports = myUserRoute