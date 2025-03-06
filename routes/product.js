const express = require("express");
const router = express.Router();

const { createProduct } = require("../services/product");

// POST
router.post("/", createProduct);

module.exports = router;
