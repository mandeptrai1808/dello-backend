const express = require('express');
const { createRow, getRowList, deleteRow, updateRow, getRowByTableId } = require('../Controllers/rows.controller');
const rowRouter = express.Router();

rowRouter.post("/", createRow)
rowRouter.get("/", getRowList)
rowRouter.delete("/:id", deleteRow)
rowRouter.put("/:id",updateRow)
rowRouter.get("/:tableId", getRowByTableId)
module.exports = {
    rowRouter
}