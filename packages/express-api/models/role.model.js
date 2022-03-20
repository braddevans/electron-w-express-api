const {Model, DataTypes} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    class Role extends Model {
    }

    Role.init({
        id: {type: Sequelize.INTEGER, primaryKey: true},
        name: DataTypes.STRING,
    }, {sequelize, modelName: 'roles'});

    Role.sync();

    return Role;
};
