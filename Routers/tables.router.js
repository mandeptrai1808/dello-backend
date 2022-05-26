const express = require('express');
const { getRowByTableId } = require('../Controllers/rows.controller');
const { createTable, getTableList, deleteTable, getTableByUserId, updateTable, rowDataOfTable } = require('../Controllers/tables.controller');
const tableRouter = express.Router();

tableRouter.post("/", createTable)
tableRouter.get("/", getTableList)
tableRouter.delete("/:id", deleteTable)
tableRouter.get("/:userId", getTableByUserId)
tableRouter.put("/:id", updateTable)
tableRouter.get("/getrows/:tableId", rowDataOfTable)

module.exports = {
    tableRouter
}