const express = require('express')
const validateToken = require('../middleware/validateToken')
const { getTodos, createTodos, updateTodosById, deleteTodosById, getTodosById } = require('../controller/task.controller')

const myTodoRoute = express.Router()

myTodoRoute.use(validateToken)
myTodoRoute.route('/').get(getTodos)
myTodoRoute.route('/:id').get(getTodosById)
myTodoRoute.route('/').post(createTodos)
myTodoRoute.route('/:id').put(updateTodosById)
myTodoRoute.route('/:id').delete(deleteTodosById)


module.exports = myTodoRoute