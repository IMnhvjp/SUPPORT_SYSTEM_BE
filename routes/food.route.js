const express = require("express");
const foodController = require("../controllers/food.controller.js")

const router = express.Router();

router.get('/', foodController.search);

module.exports = router;