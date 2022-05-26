const express = require('express');
const { createNotification, getNotificationByUserId, deleteAllNotification } = require('../Controllers/notification.controller');
const notificationRouter = express.Router();

notificationRouter.post("/create", createNotification)
notificationRouter.get("/:userId", getNotificationByUserId)
notificationRouter.delete("/delete/:userId", deleteAllNotification)
module.exports = {
    notificationRouter
}