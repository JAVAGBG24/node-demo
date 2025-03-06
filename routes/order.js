const express = require("express");
const router = express.Router();

const { createOrder, getAllOrders } = require("../services/order");

// POST
router.post("/", createOrder);

// GET all orders
router.get("/", getAllOrders);

module.exports = router;
