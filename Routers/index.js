const express = require("express");
const {sharetablesRouter} = require("./sharetables.router");
const { rowRouter } = require("./rows.router");
const { tableRouter } = require("./tables.router");
const { taskRouter } = require("./tasks.router");
const { userRouter } = require("./users.router");
const { notificationRouter } = require("./notification.router");
const rootRouter = express.Router();

rootRouter.use("/users", userRouter);
rootRouter.use("/tables", tableRouter);
rootRouter.use("/rows", rowRouter);
rootRouter.use("/tasks", taskRouter);
rootRouter.use("/sharetable", sharetablesRouter);
rootRouter.use("/notification", notificationRouter)

module.exports = {
  rootRouter,
};
