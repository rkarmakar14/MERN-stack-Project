const mongoose = require('mongoose')

const myTodos = mongoose.Schema(
    {
    UniqueId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Users",
    },
    title:{
        type:String,
        required: [true, 'Please enter the Model Name']
    },
    description:{
        type:String,
        required:[true, 'Please eneter the Description']
    }
},
{
    timestamps:true
}
)
module.exports = mongoose.model('todos', myTodos)