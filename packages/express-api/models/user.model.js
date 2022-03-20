const { Model, DataTypes } = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class User extends Model {}
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, { sequelize, modelName: 'user' });

  User.sync();

  return User;
};
