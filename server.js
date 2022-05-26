const express = require("express");
const app = express();
const path = require("path");
const { sequelize } = require("./models");
const { rootRouter } = require("./Routers");
const socketIO = require("socket.io");
const { Server } = require("socket.io");
const cors = require("cors");
const http = require("https");
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

const publicPath = path.join(__dirname, "./Public");
app.use("/Public", express.static(publicPath));

app.use("/api/v1", rootRouter);

// const server = http.createServer(app);
const io = new Server({
  cors: {
    origin: "*",
  },
});

//user connect list
let onlineUsers = [];
const addNewUser = (username, socketId) => {
  !onlineUsers.some((user) => user.username === username) &&
    onlineUsers.push({ username, socketId });
};
const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};
const getUser = (username) => {
  return onlineUsers.find((user) => user.username === username);
};

io.on("connection", (socket) => {
  socket.on("newUser", (username) => {
    console.log("helo");
    addNewUser(username, socket.id);
    console.log(onlineUsers);
  });

  socket.on("addMember", (name) => {
    // console.log(getUser(name));
    // if(getUser(name))
    io.to(getUser(name)?.socketId).emit("notification");
  })

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});
const port = 6969;

io.listen(5000);

app.listen(port, async () => {
  console.log(`server run on http://locahost:${port}`);

  try {
    await sequelize.authenticate();
    console.log("Connect database success!");
  } catch (error) {
    console.log("Connect database error!", error);
  }
});
