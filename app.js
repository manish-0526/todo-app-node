require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose');

const { getTodos, addTodo, completeTodo, undoTodo, deleteTodo } = require('./controllers/task_controller')

const app = express()

// setup mongodb
mongoose.connect(`${process.env.MONGO_CONNECTION_STRING}/${process.env.MONGO_DB_NAME}`)
    .then(() => {
        console.log('Connected to DB');
    });

app.use(express.urlencoded());

// setup view engine
app.set('view engine', 'ejs');

// setup static files
app.use(express.static('public'));

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`)
})

// middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`)

    if (Object.keys(req.body).length > 0) {
        console.log(req.body)
    }
    next();
});

// todo list page
app.get('/', async (req, res) => {
    res.render('index', { 'todos': await getTodos(false), 'completed': await getTodos(true) })
});

app.post('/create', async (req, res) => {
    const { title, desc } = req.body
    await addTodo(title, desc)
    res.redirect('/')
});

app.post('/complete', async (req, res) => {
    const { taskId } = req.body
    await completeTodo(taskId)
    res.redirect('/')
})

app.post('/undo', async (req, res) => {
    const { taskId } = req.body
    await undoTodo(taskId)
    res.redirect('/')
})

app.post('/delete', async (req, res) => {
    const { taskId } = req.body
    await deleteTodo(taskId)
    res.redirect('/')
})

// 404 page
app.use((req, res) => {
    res.status(404).render('404')
});