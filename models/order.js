const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Canceled"],
      default: "Pending",
    },
    customerEmail: {
      type: String,
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    shippingAddress: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
