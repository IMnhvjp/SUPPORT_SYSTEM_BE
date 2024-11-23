const express = require("express");
const router = express.Router();
const testController = require("../controllers/test");

router.get("/food", testController.food);
router.get("/restaurants", testController.restaurants);
router.get("/types", testController.types);

module.exports = router;
