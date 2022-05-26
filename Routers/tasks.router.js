const express = require("express");
const {
  createTask,
  getListTask,
  getTaskByRowId,
  updateTask,
  deleteTask,
  moveTask,
} = require("../Controllers/tasks.controller");
const taskRouter = express.Router();

taskRouter.post("/", createTask);
taskRouter.get("/:rowId", getTaskByRowId);  
taskRouter.get("/", getListTask);
taskRouter.put("/:id", updateTask);
taskRouter.delete("/:id", deleteTask);
taskRouter.post("/movetask",moveTask)
module.exports = {
  taskRouter,
};
