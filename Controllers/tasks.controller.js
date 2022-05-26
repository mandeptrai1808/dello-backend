const { tasks, sequelize } = require("../models");

const createTask = async (req, res) => {
  const { name, rowId,userId } = req.body;
  try {
    const newTask = await tasks.create({ name, rowId, userId });
    res.status(201).send(newTask);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getListTask = async (req, res) => {
  try {
    const taskList = await tasks.findAll();
    res.send(taskList);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    if (await tasks.findOne({ where: { id } })) {
      await tasks.destroy({ where: { id } });
      res.send("Delete success!");
      return;
    }
    res.status(404).send("NOT FOUND");
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    if (await tasks.findOne({ where: { id } })) {
      await tasks.update({ name }, { where: { id } });
      let dataUpdate = await tasks.findOne({where: {id}});
      res.send(dataUpdate);
      return;
    }
    res.status(404).send("NOT FOUND");
  } catch (error) {
    res.status(500).send(error);
  }
};

const getTaskByRowId = async (req, res) => {
  const { rowId } = req.params;
  try {
    const taskList = await tasks.findAll({ where: { rowId } });
    res.send(taskList);
  } catch (error) {
    res.status(500).send(error);
  }
};

const moveTask = async (req, res) => {
  const {idTask, indexRowFrom}  = req.body;
  console.log(idTask)
  try {
    const taskFind = await tasks.findOne({where: {id: idTask}})
   taskFind.rowId = indexRowFrom;
   await taskFind.save();
   res.send({msg:"Updated!", taskFind});
  } catch (error) {
    res.status(500).send(error)
  }
}

module.exports = {
  createTask,
  deleteTask,
  getListTask,
  updateTask,
  getTaskByRowId,
  moveTask
};
