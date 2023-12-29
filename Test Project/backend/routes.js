const express = require("express");
const playerController = require("./playerController");

const router = express.Router();

router.post("/api/save", playerController.savePlayer);
router.get("/api/:playerName", playerController.getPlayer);
router.delete("/api/:playerId", playerController.deletePlayer);

module.exports = router;
