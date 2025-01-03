const express = require("express");

const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const db = require("./models")

const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

const testRoute = require('./routes/test');
app.use("/api/test", testRoute);

// app.options("*", cors());


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
