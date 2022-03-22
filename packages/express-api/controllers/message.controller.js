const db = require("../models");
const {Op} = require("sequelize");
const User = db.user;
const Message = db.messages;


exports.createMessage = async (req, res) => {
    if (req.body.message == null) {
        res.status(404).send("Cannot send empty message");
    } else {
        let userID = req.userId;
        let timestamp = new Date().getTime();
        //get user obj from database
        let user = await User.findAll({
            where: {
                id: {
                    [Op.eq]: userID
                }
            }
        });

        let msgid = 0;
        // add message to database
        let msg = await Message.create({
            user_id: userID,
            username: JSON.stringify(user),
            message: req.body.message,
            created_at: timestamp,
            updated_at: timestamp
        }).then(result => msgid = result.message_id);

        let message = {
            body: req.body.message,
            user: user,
            messageID: msgid
        }

        res.status(200).send(JSON.stringify(message));
    }
};
