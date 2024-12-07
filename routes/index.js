const express = require("express");
const foodRoute = require("./food.route.js");
const typeRoute = require("./type.route.js")
const router = express.Router();


router.use("/food",foodRoute);
router.use("/type", typeRoute)

module.exports = router
