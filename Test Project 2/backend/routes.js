const express = require("express");
const userController = require("./controller/userController");
const slotController = require("./controller/slotController");

const router = express.Router();

//routes for user controller
router.get("/api/getData", userController.getSlot);
router.post("/api/bookslot", userController.saveSlot);
router.delete("/api/:userId", userController.deleteSlot);

//routes for slot controller
router.get("/api/getSlotInfo", slotController.getSlotInfo);
router.post("/api/postSlot", slotController.postSlot);
router.put("/api/decreaseSlot/:slotId", slotController.decreaseSlot);
router.put("/api/increaseSlot/:slotId", slotController.IncreaseSlot);

module.exports = router;
