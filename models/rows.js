'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rows extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({tables, rows}) {
      // define association here
      this.belongsTo(tables, {foreignKey:"tableId"})
      this.hasMany(rows, {foreignKey: "rowId"})
    }
  }
  rows.init({
    name: DataTypes.STRING,
    tableId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'rows',
  });
  return rows;
};