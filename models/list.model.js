const mongoose = require('mongoose')
const {Schema, model} = mongoose

const listSchema = new Schema({

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