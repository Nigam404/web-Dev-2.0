const Slot = require("../models/slotModel");
exports.getSlotInfo = (req, res, next) => {
  Slot.findAll()
    .then((slots) => {
      res.json(slots);
    })
    .catch((err) => console.log(err));
};
exports.postSlot = (req, res, next) => {
  Slot.create({ time: req.body.time, available: req.body.available })
    .then((result) => {
      res.json(result.dataValues);
      console.log(result.dataValues);
    })
    .catch((err) => console.log(err));
};

exports.decreaseSlot = (req, res, next) => {
  const slotId = req.params.slotId;
  Slot.findByPk(slotId)
    .then((slot) => {
      slot.update({ available: slot.available - 1 }); //decreasing slot count by 1 after booking.
      res.json(slot);
    })
    .catch((err) => console.log(err));
};

exports.IncreaseSlot = (req, res, next) => {
  const slotId = req.params.slotId;
  Slot.findByPk(slotId)
    .then((slot) => {
      slot.update({ available: slot.available + 1 }); //increasing slot count by 1 after cancel booking.
      res.json(slot);
    })
    .catch((err) => console.log(err));
};
