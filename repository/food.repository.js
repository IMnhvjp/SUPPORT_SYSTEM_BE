const db = require("../models");
const sequelize = require("../models").sequelize;
const {Sequelize, Op} = require("sequelize");
const { Food, Restaurants, Types } = sequelize.models;
const helper = require("../utils/helper.js")
const getAllFood = async ({type = null, time = null}) => {
    const where = {};
    if (type) {
        where.id = type.split(',')
    }
    return (await Food.findAll({
        include: [
            {
                model: Restaurants,
                as: 'restaurant'
            },
            {
                model: Types,
                as: 'type',
                where,
                required: true
            }
        ]
    })).filter(currFodd => {
        if (!time){
            return true;
        }
        return helper.isOpened(time, currFodd.dataValues.restaurant.times)
    });
}

module.exports = {
    getAllFood
}