const Todo = require('../models/todo')

const getTodos = async (completed) => {
    const todos = await Todo.find({ status: completed })
    return todos;
}

const addTodo = async (title, desc) => {
    const todo = new Todo({
        title: title,
        desc: desc,
        status: false
    })

    await todo.save()
}

const completeTodo = async (id) => {
    await Todo.findByIdAndUpdate(id, {
        status: true
    })
}

const undoTodo = async (id) => {
    await Todo.findByIdAndUpdate(id, {
        status: false
    })
}

const deleteTodo = async (id) => {
    await Todo.findByIdAndDelete(id)
}

module.exports = {
    getTodos,
    addTodo,
    completeTodo,
    undoTodo,
    deleteTodo
}