const mongoose = require('mongoose')

const myUsers = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Name is requiered']
    },
    username:{
        type:String,
        required:[true, 'Please eneter the email address'],
        trim:true,
    },
    password:{
        type:String,
        required:[true, `Please enter the password`]
    }
})
module.exports = mongoose.model('Users', myUsers)