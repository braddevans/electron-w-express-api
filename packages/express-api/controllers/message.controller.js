const db = require("../models");
const {Op} = require("sequelize");
const User = db.user;
const Message = db.messages;


exports.createMessage = (req, res) => {
    if (req.body.message == null) {
        res.status(404).send("Cannot send empty message");
    } else {
        let userID = req.userId;
        let timestamp = new Date().getTime();
        let user = User.findAll({
            where: {
                id: {
                    [Op.eq]: userID
                }
            }
        });
        let message = {
            body: req.body,
            messageID: Message.create({
                user_id: userID,
                username: user.username,
                message: req.body,
                created_at: timestamp,
                updated_at: timestamp
            })
        }

        res.status(200).send(JSON.stringify(message));
    }
};
