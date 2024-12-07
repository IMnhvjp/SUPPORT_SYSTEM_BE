const foodService = require("../services/food.service.js");
const lodash = require("lodash");

const search = async (req, res, next) => {
    try {
        // time: [1-time1-time2]
        const {type, lat,long, price, calo, time} = lodash.pick(req.query, ["type", "lat", "long", "price", "time", "calo"]);
        const response = await foodService.search({
            type,
            lat,
            long,
            price,
            calo,
            time
        });
        if (response.status === 200) {
            return res.status(200).json(response.data);
        }
        else {
            return res.status(response.status).json({
                message: response.message
            })
        }
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            message: e.message
        })
    }
}

module.exports = {
    search
}