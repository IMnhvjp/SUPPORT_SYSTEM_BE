const mathjs = require("mathjs");

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
const convert = (rawData) => {
    const processData = rawData.map(item => {
        try {
            const value = item.restaurant_avg_rating * mathjs.log(item.restaurant_total_review) * mathjs.log(item.total_like);
            item.processed_rating = value;
            return item;
        }
        catch (e) {
            item.processed_rating = 0;
            return item
        }
    });
    return processData
}

module.exports = {
    convert
}