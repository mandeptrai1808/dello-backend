const { tables, sequelize } = require("../models");

const createTable = async (req, res) => {
  const { name, userId } = req.body;
  try {
    const newTable = await tables.create({
      name,
      userId,
    });
    res.status(201).send(newTable);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getTableList = async (req, res) => {
  try {
    const tableList = await tables.findAll();
    res.send(tableList);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteTable = async (req, res) => {
  const { id } = req.params;
  try {
    if (await tables.findOne({ where: { id } })) {
      await tables.destroy({ where: { id } });
      res.send("Delete sucees!");
      return;
    }
    res.status(404).send("NOT FOUND");
  } catch (error) {
    res.status(500).send(error);
  }
};

const getTableByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const tableList = await tables.findAll({ where: { userId } });
    res.send(tableList);
  } catch (error) {
    res.status(500).send(error);
  }
};

const rowDataOfTable = async (req, res) => {
  const { tableId } = req.params;
  try {
    const rowList = await sequelize.query(`
    select  trello_db.rows.id as row_id, trello_db.rows.name as row_name, 
    trello_db.tasks.name as task_name,trello_db.tasks.id as task_id, trello_db.tasks.userId,
    trello_db.users.name as username, trello_db.users.avatar 
    from trello_db.tables
    left join trello_db.rows
    on trello_db.rows.tableId = trello_db.tables.id
    left join trello_db.tasks
    on trello_db.rows.id = trello_db.tasks.rowId
    left join trello_db.users
    on trello_db.users.id = trello_db.tasks.userId
    where trello_db.tables.id = ${tableId}
    `);
    let dataRespond = [],
      indexDataRespond = -1;
    var check = -1;
    rowList[0].map((item, index) => {
      if (item.row_id !== check) {
        indexDataRespond++;
        dataRespond.push({
          row_id: item.row_id,
          row_name: item.row_name,
          tasks: [{
            task_id: item.task_id,
            task_name: item.task_name,
            username: item.username,
            avatar: item.avatar
          }],
        });
        check = item.row_id;
      }
      else{
        dataRespond[indexDataRespond].tasks.push({
          task_id: item.task_id,
          task_name: item.task_name,
          username: item.username,
          avatar: item.avatar
        })
      }
    });
    res.send(dataRespond);
  } catch (err) {
    res.status(500).send(err);
  }
};

const updateTable = async (req, res) => {
  const { id } = req.params;
  const dataTable =  req.body;
  try {
    let tableFind = await tables.findOne({where: {id}});
    if (dataTable.name) tableFind.name = dataTable.name;
    if (dataTable.backgroundImage) tableFind.backgroundImage = dataTable.backgroundImage;
    tableFind.save();
    res.send({msg: "Updated!", tableFind})
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createTable,
  getTableList,
  deleteTable,
  getTableByUserId,
  updateTable,
  rowDataOfTable,
};
