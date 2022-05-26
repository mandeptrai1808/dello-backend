const {rows, sequelize} = require('../models');

const createRow = async (req, res) => {
  const {name, tableId} = req.body;
  try {
      const newRow = await rows.create({name, tableId});
      res.status(201).send(newRow);
  } catch (error) {
      res.status(500).send(error)
  }
}

const getRowList = async (req, res) => {
  try {
      const rowList = await rows.findAll();
      res.send(rowList);
  } catch (error) {
      res.status(500).send(error);
  }
}

const deleteRow = async (req, res) => {
  const {id} = req.params;
  try {
   
          await rows.destroy({where: {id}});
          res.send("Delete success!");
  } catch (error) {
      res.status(404).send(error);
  }
}

const updateRow = async (req, res) => {
  const {id} = req.params;
  const {name} = req.body;
  try {
    
        await rows.update({name},{where: {id}});
        res.send("Update success!");
  } catch (error) {
      res.send(error)
  }
}

const getRowByTableId = async (req, res) => {
  const {tableId} = req.params;
  try {
    const rowList = await rows.findAll({where: {tableId}});
    res.send(rowList)
  } catch (error) {
      res.status(500).send(error)
  }
}

module.exports  = {
    createRow,
    getRowList,
    deleteRow,
    updateRow,
    getRowByTableId
}