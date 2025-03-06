const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
require("dotenv").config();
const errorHandler = require("./middlewares/error");

const app = express();

// connect db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("**CONNECTED TO MONGODB DATABASE**"))
  .catch((err) => console.log("MongoDB connection error:", err));

// import routes
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");

// middlewares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// route middleware
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// test route
app.get("/api/hello/", (req, res) => {
  res.send("Hello from NODE API :)");
});

// error handler (must be after all routes)
app.use(errorHandler);

// port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
