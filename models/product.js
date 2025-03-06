const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    colors: [
      {
        name: String,
      },
    ],
    size: {
      type: String,
      enum: {
        values: ["XS", "S", "M", "L", "XL", "XXL"],
      },
    },
    gender: {
      type: String,
      enum: ["Men", "Women", "Unisex"],
    },
    category: {
      type: String,
      enum: ["Tops", "Bottoms", "Outerwear"],
      required: true,
    },
    image: {
      type: String,
    },
    stock: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
