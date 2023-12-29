const Player = require("./playerModel");

exports.savePlayer = (req, res, next) => {
  //creating row in db table using the object data passed through axios post.
  Player.create({
    name: req.body.name,
    dob: req.body.dob,
    photourl: req.body.photourl,
    birthplace: req.body.birthplace,
    career: req.body.career,
    matches: req.body.matches,
    score: req.body.score,
    fifties: req.body.fifties,
    centuries: req.body.centuries,
    wickets: req.body.wickets,
    average: req.body.average,
  }).then((player) => {
    res.json(player.dataValues); //sending the added object with attached id to frontend js.
    console.log("Player data stored in DB...");
  });
};

exports.getPlayer = (req, res, next) => {
  let playerName = req.params.playerName;
  Player.findAll({ where: { name: playerName } })
    .then((player) => {
      if (player.length > 0) {
        res.json(player[0].dataValues);
        console.log("inside controller-->", player[0].dataValues);
      } else {
        res.json([]);
        console.log("No data found for searched player");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deletePlayer = (req, res, next) => {
  let playerid = req.params.playerId;
  Player.findByPk(playerid)
    .then((player) => {
      return player.destroy();
    })
    .then() //because destroy also return a promise.this then is to handle that.
    .catch((err) => console.log(err));
};
