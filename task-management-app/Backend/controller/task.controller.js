const asyncHandler = require("express-async-handler");
const todos = require("../models/task.table");
const users = require('../models/model.user')
//working
const getTodos = asyncHandler(async (req, res) => {
  const task = await todos.find();
  res.status(200).json({ status: "oke", details: task });
});

//working
const getTodosById = asyncHandler(async (req, res) => {

  const data = await todos.findById(req.params.id);

  // if (data.UniqueId.toString() !== req.todos.id) {
  //   res.send(errors);
  // }
  res.status(200).json({
    Details: data,
  });
});
//working
const createTodos = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  console.log(req.body)

  if (!(title && description)) {
    res.status(400);
    throw new Error(`Id does not match`);
  }
  const data = await todos.create({
    // UniqueId:req.todos.id,
    title,
    description,
  });

  // if (data.UniqueId.toString() != req.todos.id) {
  //   res.send(errors);
  // }

  res.status(200).json({
    message: `This is Post task`,
    AddedTodo: data,
  });
});

const updateTodosById = asyncHandler(async (req, res) => {
  //
  const data = await users.findById(req.params.id);
  console.log(data);
  // if (data.UniqueId.toString() !== req.users.id) {
  //   res.status(400);
    // throw new Error(`Id does not match`);
  // };
  const updatedTodos = await todos.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new:true}
  )
  res.status(200).json({
    message: `Todos updated`,
    Updated_Todos: updatedTodos,
  });
});

const deleteTodosById = asyncHandler(async (req, res) => {
  const data = await users.findByIdAndUpdate(req.params.id);
  // if (data.UniqueId.toString() != req.users.id) {
  //   res.status(400);
  //   throw new Error(`Id does not match`);
  // }
  res.status(200).json({
    message: `The Todos has been Deleted`,

  });
});
module.exports = {
  getTodos,
  getTodosById,
  createTodos,
  updateTodosById,
  deleteTodosById,
};
