const db = require("../models");
module.exports = {
  food: async () => {
    try {
      const response = await db.Food.findAll();
      if (response) {
        return {
          data: response,
        };
      }
      return {
        error: "Cannot find resouces",
      };
    } catch (error) {
      return {
        error: error.errors[0].message,
      };
    }
  },
  restaurants: async () => {
    try {
      const response = await db.Restaurants.findAll();
      if (response) {
        return {
          data: response,
        };
      }
      return {
        error: "Cannot find resouces",
      };
    } catch (error) {
      return {
        error: error.errors[0].message,
      };
    }
  },
  types: async () => {
    try {
      const response = await db.Types.findAll();
      if (response) {
        return {
          data: response,
        };
      }
      return {
        error: "Cannot find resouces",
      };
    } catch (error) {
      return {
        error: error.errors[0].message,
      };
    }
  },
}