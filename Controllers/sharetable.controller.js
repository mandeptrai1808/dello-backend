const {sharetables, sequelize} = require("../models");

const shareTable = async (req, res) => {
  const {userId, tableId} = req.body;
  try {
      if (!(await sharetables.findOne({where: {userId, tableId}}))){
          const newShare = await sharetables.create({userId, tableId});
          res.status(201).send(newShare)
      }
      else res.status(400).send("User này đã được chia sẻ table này!")
  } catch (error) {
      res.status(500).send(error);
  }
}

const getListUserBeSharedByTableId = async (req, res) => {
  let {tableId} = req.params;
  try {
      let data = await sequelize.query(
          `
          SELECT trello_db.users.id, trello_db.users.name, trello_db.users.email, trello_db.users.phone, trello_db.users.avatar
        FROM trello_db.sharetables
        inner join trello_db.tables
        on trello_db.tables.id = trello_db.sharetables.tableId
        inner join trello_db.users
        on trello_db.users.id = trello_db.sharetables.userId
        where trello_db.sharetables.tableId = ${tableId};
          `
      )
      let admin = await sequelize.query(
        `
        SELECT trello_db.users.id, trello_db.users.name, trello_db.users.avatar,trello_db.users.email FROM trello_db.tables
        inner join trello_db.users
        on trello_db.users.id = trello_db.tables.userId
        where trello_db.tables.id = ${tableId};
        `
      )
      res.send({users: data[0], admin: admin[0][0]});
  } catch (error) {
      res.status(500).send(error);
  }
}

const getListTableSharedByUserId = async (req,res) => {
  let {userId} = req.params;
  try {
      let data = await sequelize.query(
        
        `SELECT trello_db.tables.id, trello_db.tables.name, trello_db.tables.backgroundImage, trello_db.tables.userId
        FROM trello_db.sharetables
        inner join trello_db.tables
        on trello_db.tables.id = trello_db.sharetables.tableId
        inner join trello_db.users
        on trello_db.users.id = trello_db.sharetables.userId
        where trello_db.sharetables.userId = ${userId};
        `
        )
        res.send(data[0]);
  } catch (error) {
      res.status(500).send(error);
  }
}

 const DeleteMember = async (req, res) => {
  let {userId, tableId} = req.body;
  try {
    await sharetables.destroy({where: {userId, tableId}})
    res.send("Delete success!")
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
    shareTable,
    getListUserBeSharedByTableId,
    getListTableSharedByUserId,
    DeleteMember
}