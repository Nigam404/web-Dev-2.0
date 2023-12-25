const express = require("express");
const expenseController = require("../controllers/expenseC");

const router = express.Router();
router.get("/", expenseController.getExpense);
router.post("/", expenseController.postExpense);
router.delete("/:expId", expenseController.deleteExpense);
module.exports = router;
