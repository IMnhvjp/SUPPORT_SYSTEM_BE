const mathjs = require("mathjs");
const helper = require("../utils/helper.js");
// {

//     name: dataValues.name,
//     description: dataValues.description,
//     price: dataValues.price,
//     calo: dataValues.calo,
//     total_like: dataValues.total_like,
//     restaurant_name: dataValues.restaurant.place,
//     restaurant_latitude: dataValues.restaurant.latitude,
//     restaurant_longitude: dataValues.restaurant.longitude,
//     restaurant_total_review: dataValues.restaurant.total_review,
//     restaurant_avg_rating: dataValues.restaurant.avg_rating,
// }

const convert = (rawdata, wantedCalo) => {
    const processedData = rawdata.reduce((acc, curr) => {
        try {
            const actual_calo = curr.original_calo;
            const value = helper.function_f(wantedCalo, actual_calo, wantedCalo * wantedCalo);
            curr.processed_calo = value;
            acc.push(curr);
            return acc;
        }
        catch (e) {
            const actual_calo = curr.original_calo;
            const value = helper.function_f(300, actual_calo, 300 * 300);
            curr.processed_calo = value;
            acc.push(curr);
            return acc;
        }
    }, [])
    return processedData
}

module.exports = {
    convert
}