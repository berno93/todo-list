const mongoose = require('mongoose')
const {TodoSchema, model, TodoTypes} = mongoose
const List = require('./list.model')

const todoSchema = new TodoSchema({
    
    id:{
        type:Number,
        required:true,
        unique: true
    },

    listId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"List",
        required: true
    }
})

const Todo = model('Todo',todoSchema)
module.exports = Todo