'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tables extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({users, rows, sharetables}) {
      // define association here
      this.belongsTo(users, {foreignKey: "userId"});
      this.hasMany(rows, {foreignKey: "tableId"});
      this.hasMany(sharetables, {foreignKey: "tableId"});
    }
  }
  tables.init({
    name: DataTypes.STRING,
    backgroundImage: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'tables',
  });
  return tables;
};