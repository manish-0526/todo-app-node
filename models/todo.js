const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    desc: {
        type: String,
        required: true
    },

    status: {
        type: Boolean,
        required: true
    }

}, { timestamps: true })

const Todo = mongoose.model('todo', todoSchema);
module.exports = Todo;