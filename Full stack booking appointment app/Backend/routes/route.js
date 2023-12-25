const express = require("express");
const router = express.Router();
const apiController = require("../controllers/apiC");

router.get("/", apiController.getReq);
router.get("/:userId", apiController.getSingleUser);
router.post("/", apiController.postReq);
router.delete("/:userId", apiController.deleteReq);

module.exports = router;
