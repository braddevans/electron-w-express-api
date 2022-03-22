const {Model, DataTypes} = require('sequelize');
module.exports = (sequelize) => {
    class Messages extends Model {
    }

    Messages.init({
        message_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: DataTypes.INTEGER,
        username: DataTypes.STRING,
        Message: DataTypes.STRING(6000),
    }, {sequelize, modelName: 'messages'});

    Messages.sync();

    return Messages;
};
