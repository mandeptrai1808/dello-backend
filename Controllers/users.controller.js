const { users, sequelize } = require("../models");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const jsonwt = require("jsonwebtoken");
const res = require("express/lib/response");
const createUser = async (req, res) => {
  const { name, password, email, phone } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  try {
    const avatar = `https://ui-avatars.com/api/?name=${name}`;
    const newUser = await users.create({
      name,
      email,
      password: hashPassword,
      phone,
      avatar
    });
    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFind = await users.findOne({ where: { email } });
    if (userFind) {
      const isLogin = bcrypt.compareSync(password, userFind.password);
      if (isLogin) {
        const token = jsonwt.sign({ email: userFind.email }, "mandeptrai30cm", {
          expiresIn: 60 * 60 * 24,
        });
        console.log(token);
        res.send({ message: "Login succsess", userFind, token });
      } else res.status(400).send("Password incorrect!");
    } else res.status(404).send("Not found this user email!");
  } catch (error) {
    res.status(500).send(error);
  }
};

const getUsers = async (req, res) => {
  try {
    const userList = await users.findAll();
    res.send(userList);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const userFind = await users.findOne({ where: { id } });
    if (userFind) res.send(userFind);
    else res.status(404).send("Not found this user!");
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    if (await users.findOne({ where: { id } })) {
      await users.destroy({ where: { id } });
      res.send("Delete sucess");
      return;
    }res.status(404).send("not found!")
  } catch (error) {
      res.status(500).send(error)
  }
};

const uploadAvatar= async (req, res) => {
    const { file } = req;
    const pathImg = `http://localhost:6969/${file.path}`;
    const { email } = req.user;
    const foundUser = await users.findOne({ where: { email } });
    foundUser.avatar = pathImg;
    await foundUser.save();
    res.send({ msg: "Da upload avatar", file: pathImg, user: foundUser });
    // res.send({file: file, body: req.body});
}

const findUserByName = async (req, res) => {
  // console.log(req.body)
  let {name} = req.params;
  try {
    let result =  await users.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
    });
    res.send(result);
  } catch (error) {
    res.status(500).send(error)
  }
}

module.exports = {
  createUser,
  loginUser,
  getUsers,
  getUserById,
  deleteUser,
  uploadAvatar,
  findUserByName
};
