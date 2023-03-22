const mongoose = require('mongoose')
const {ListSchema, model, ListTypes} = mongoose
const User = require('./user.model')

const listSchema = new ListSchema({
        
    id:{
        type:Number,
        required:true,
        unique: true
    },

    userId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true  
    },

    name:{
        type:String,
        required: true,
        unique: true
    }
})

const List = model('List',listSchema)
module.exports = List