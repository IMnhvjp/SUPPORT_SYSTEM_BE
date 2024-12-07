const express = require("express");
const foodRoute = require("./food.route.js");
const router = express.Router();


router.use("/food",foodRoute);


module.exports = router
