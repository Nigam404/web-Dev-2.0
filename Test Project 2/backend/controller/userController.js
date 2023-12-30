const User = require("../models/userModel");

exports.saveSlot = (req, res, next) => {
  User.create({
    name: req.body.name,
    mail: req.body.mail,
    slot: req.body.slot,
    slotid: req.body.slotid,
  })
    .then((user) => {
      res.json(user.dataValues);
      console.log("User data stored in db");
    })
    .catch((err) => console.log(err));
};

exports.getSlot = (req, res, next) => {
  User.findAll()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => console.log(err));
};

exports.deleteSlot = (req, res, next) => {
  const id = req.params.userId;
  User.findByPk(id)
    .then((user) => {
      return user.destroy();
    })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => console.log(err));
};
