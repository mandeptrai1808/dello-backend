const express = require('express');
const { createUser, loginUser, getUsers, getUserById, deleteUser, uploadAvatar, findUserByName } = require('../Controllers/users.controller');
const {authenticate} = require('../Middleware/Auth/authenticate')
const {uploadImg} = require('../Middleware/Upload/uploadImg')
const userRouter = express.Router();

userRouter.post("/register", createUser);
userRouter.post("/login", loginUser)
userRouter.get("/finduser/:name", findUserByName)
userRouter.get("/", getUsers);
userRouter.get("/:id", getUserById)
userRouter.delete("/:id", deleteUser)
userRouter.post("/upload-avatar", authenticate, uploadImg("Avatar"), uploadAvatar)

module.exports = {
    userRouter
}