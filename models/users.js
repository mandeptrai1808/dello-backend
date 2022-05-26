'use strict';
const {
  Model
} = require('sequelize');
const sharetables = require('./sharetables');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({tables, sharetables, tasks, notification}) {
      // define association here
      this.hasMany(tables, {foreignKey: "userId"})
      this.hasMany(sharetables, {foreignKey: "userId"})
      this.hasMany(tasks, {foreignKey: "userId"})
      this.hasMany(notification, {foreignKey: "userId"})
    }
  }
  users.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    password: DataTypes.STRING,
    avatar: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};