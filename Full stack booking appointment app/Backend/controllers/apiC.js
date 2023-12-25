const User = require("../models/userM");

//getting data method
module.exports.getReq = (req, res, next) => {
  User.findAll()
    .then((users) => {
      res.json(users); //sending json array of all users data
    })
    .catch((err) => {
      console.log(err);
    });
};

//getting single user
module.exports.getSingleUser = (req, res, next) => {
  const userId = req.params.userId;
  User.findByPk(userId)
    .then((user) => {
      res.json(user); //sending single user data as json object
    })
    .catch((err) => console.log(err));
};

//saving data method
module.exports.postReq = async (req, res, next) => {
  const name = req.body.name;
  const mail = req.body.mail;
  const phone = req.body.phone;
  const date = req.body.date;
  const time = req.body.time;
  console.log(name, mail, phone, date, time);
  await User.create({
    name: name,
    mail: mail,
    phone: phone,
    date: date,
    time: time,
  })
    .then(() => {
      console.log("User data saved");
    })
    .catch((err) => {
      console.log(err);
    });
};

//deleting user method
module.exports.deleteReq = (req, res, next) => {
  const userId = req.params.userId;
  User.findByPk(userId)
    .then((user) => {
      return user.destroy();
    })
    .then((res) => {
      // console.log(res);
    })
    .catch((err) => console.log(err));
};
