const express = require('express');
const isLoggendIn = require('./middleware/isLoggenin')
const router = express.Router();

const updateTodoRoute = require('./routes/updateTodoRoute')
const readTodosRoute = require('./routes/readTodosRoute')
const createTodoRoute = require('./routes/createTodoRoute')
const deleteTodoRoute = require('./routes/deleteTodoRoute')


router.post('/login', require('./routes/loginRoute'))

router.get('/todos', isLoggendIn, readTodosRoute)

router.post('/todos', isLoggendIn, createTodoRoute)

router.put('/todos/:id', isLoggendIn, updateTodoRoute)

router.delete('/todos/:id', isLoggendIn, deleteTodoRoute)

module.exports = router;