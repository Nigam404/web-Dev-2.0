const path = require("path");
const express = require("express");
const shopController = require("../controllers/shopC");

const router = express.Router();

router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);
router.get("/products/:productId", shopController.getSingleProduct); //Dynamic route

router.get("/cart", shopController.getCart);
router.post("/cart",shopController.postCart)

router.get("/orders", shopController.getOrders);

router.get("/checkout", shopController.getCheckout);

module.exports = router;
