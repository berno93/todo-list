const mongoose = require('mongoose')
const {UserSchema, model, UserTypes} = mongoose

const userSchema = new UserSchema({
    
    id:{
        type:Number,
        required:true,
        unique: true
    },

    email:{
        type:String,
        required:true,
        unique: true
    },

    password:{
        type:String,
        required:true,
    }
})

const User = model('User',userSchema)
module.exports = User