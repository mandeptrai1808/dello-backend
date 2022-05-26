const express = require('express');
const { shareTable, getListUserBeSharedByTableId, getListTableSharedByUserId, DeleteMember } = require('../Controllers/sharetable.controller');
const sharetablesRouter = express.Router();

sharetablesRouter.post("/", shareTable);
sharetablesRouter.get("/gettables/:userId", getListTableSharedByUserId)
sharetablesRouter.get("/getusers/:tableId", getListUserBeSharedByTableId)
sharetablesRouter.delete("/deletemember", DeleteMember);
module.exports = {
    sharetablesRouter
}
