const db = require("../models");
const User = db.user;
const Message = db.messages;


exports.createMessage = (req, res) => {
  res.status(200).send("User_id: " + req.userId);
};
