const ErrorResponse = require("../middlewares/errorResponse");
const Product = require("../models/product");
const Order = require("../models/order");

exports.createOrder = async (req, res, next) => {
  try {
    const { ...orderData } = req.body;

    // validate products
    for (const item of orderData.products) {
      // get products from db
      const product = await Product.findById(item.product);

      if (!product) {
        return next(new ErrorResponse("Product not found", 404));
      }

      // check stock
      if (product.stock < item.quantity) {
        return next(new ErrorResponse("Not enugh stock", 400));
      }

      // update product stock
      product.stock -= item.quantity;
      await product.save();
    }

    // create order and save
    const order = await new Order(orderData).save();

    res.status(201).json({
      success: true,
      data: order,
    });
  } catch (error) {
    return next(new ErrorResponse("Order creation failed", 500));
  }
};

exports.getAllOrders = async (req, res, next) => {
  try {
    // query database
    const orders = await Order.find({}); /* .populate({
      path: "products.product",
      select: "name price image",
      model: "Product",
    }); */

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    return next(new ErrorResponse("Failed, to fetch orders", 500));
  }
};
