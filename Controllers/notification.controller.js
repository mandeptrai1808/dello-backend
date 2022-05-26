const res = require('express/lib/response');
const { send } = require('express/lib/response');
const {notification} = require('../models')

const createNotification = async (req, res) => {
  const {usersend, avatar, content, userId} = req.body;
  try {
        let newNotification = await notification.create({usersend, avatar, content, userId});
        res.status(201).send(newNotification);
  } catch (error) {
        res.status(500).send(error)
  }
}

const getNotificationByUserId = async (req, res) => {
  const {userId} = req.params;
  try {
      let dataFind = await notification.findAll({where: {userId}});
      res.send(dataFind)
  } catch (error) {
      res.status(500).send(error);
  }
}

const deleteAllNotification = async (req,res) => {
  const {userId} = req.params;
    try {
      await notification.destroy({where: {userId}})
      res.send("Deleted!");  
    } catch (error) {
        res.status(500).send(error)
    }
}


module.exports = {
    createNotification,
    getNotificationByUserId,
    deleteAllNotification
}