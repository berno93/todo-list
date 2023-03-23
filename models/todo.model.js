const mongoose = require('mongoose')
const {Schema, model} = mongoose


const todoSchema = new Schema({

    listId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"List",
        required: true
    }
})

const Todo = model('Todo',todoSchema)
module.exports = Todo