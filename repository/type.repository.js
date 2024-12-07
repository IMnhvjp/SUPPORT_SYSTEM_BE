const sequelize = require("../models").sequelize;
const {Sequelize} = require("sequelize");
const { Food, Restaurants, Types } = sequelize.models;


const searchAll = async () => {
    return await Types.findAll();
}

module.exports = {
    searchAll
}