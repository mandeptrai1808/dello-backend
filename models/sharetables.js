'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sharetables extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({users, tables}) {
      // define association here
      this.belongsTo(users, {foreignKey: "userId"});
      this.belongsTo(tables, {foreignKey: "tableId"});
    }
  }
  sharetables.init({
    userId: DataTypes.INTEGER,
    tableId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'sharetables',
  });
  return sharetables;
};