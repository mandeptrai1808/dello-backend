'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tasks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({rows, users}) {
      // define association here
      this.belongsTo(rows, {foreignKey: "rowId"});  
      this.belongsTo(users, {foreignKey: "userId"})
    }
  }
  tasks.init({
    name: DataTypes.STRING,
    rowId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'tasks',
  });
  return tasks;
};