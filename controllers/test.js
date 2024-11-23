const testService = require("../services/test");
module.exports = {
  food: async (req, res) => {
    try {
      const response = await testService.food();
      if (response.error) {
        res.status(400).json({ msg: 'khong tim thay food' });
      }
      else {
        res.status(200).json({ msg: response });
      }
    } catch(err) {
        res.status(500).json({ msg: "Server Error" });
      }
  },
  restaurants: async (req, res) => {
    try {
      const response = await testService.restaurants();
      if (response.error) {
        res.status(400).json({ msg: 'khong tim thay reataurant' });
      }
      else {
        res.status(200).json({ msg: response });
      }
    } catch(err) {
        res.status(500).json({ msg: "Server Error" });
      }
  },
  types: async (req, res) => {
    try {
      const response = await testService.types();
      if (response.error) {
        res.status(400).json({ msg: 'khong tim thay Types' });
      }
      else {
        res.status(200).json({ msg: response });
      }
    } catch(err) {
        res.status(500).json({ msg: "Server Error" });
      }
  },
}