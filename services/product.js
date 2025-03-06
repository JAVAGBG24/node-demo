const ErrorResponse = require("../middlewares/errorResponse");
const Product = require("../models/product");

exports.createProduct = async (req, res, next) => {
  try {
    const { ...productData } = req.body;

    const product = await new Product(productData).save();

    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    return next(new ErrorResponse("Failed to create product.", 500));
  }
};
