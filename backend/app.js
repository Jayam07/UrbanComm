const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors({
    origin: "http://localhost:3000",
    credentials:true
}));  

app.use(express.json());
app.use(cookieParser());
// app.use("/test", (req, res) => {
//   res.send("Hello world!");
// });

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
require('dotenv').config();

// config
// if (process.env.NODE_ENV !== "PRODUCTION") {
//   require("dotenv").config({
//     path: "config/.env",
//   });
// }

// import routes
const user = require("./controllers/user");
const shop = require("./controllers/shop");
const product = require("./controllers/product");
const event = require("./controllers/event");
const coupon = require("./controllers/coupounCode");
const payment = require("./controllers/payment");
const order = require("./controllers/order");
const conversation = require("./controllers/conversation");
const message = require("./controllers/message");
const withdraw = require("./controllers/withdraw");

app.use("/api", user);
app.use("/api/v2/conversation", conversation);
app.use("/api/v2/message", message);
app.use("/api/v2/order", order);
app.use("/api/v2/shop", shop);
app.use("/api/v2/product", product);
app.use("/api/v2/event", event);
app.use("/api/v2/coupon", coupon);
app.use("/api/v2/payment", payment);
app.use("/api/v2/withdraw", withdraw);

module.exports = app;