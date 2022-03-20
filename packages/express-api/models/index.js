const prodType = process.env.type.replaceAll("\'", "").replaceAll(" ", "");
const config = require(`../../private-config/${prodType}/config.${prodType}.json`)

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.database.database_name,
    config.database.username,
    config.database.password,
    {
        host: config.database.hostname,
        dialect: "mariadb",
        operatorsAliases: false,

        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
            logging: true
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.messages = require("../models/messages.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});
db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
