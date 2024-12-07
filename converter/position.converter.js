const haversine = require('haversine-distance');
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
const convert = (rawData, lat, long) => {
    const processData = rawData.map(item => {
        const restaurant_position = {
            longitude: item.restaurant_longitude,
            latitude: item.restaurant_latitude
        }
        const cutomer_position  = {
            longitude: long,
            latitude: lat,
        }
        item.distance = haversine(restaurant_position, cutomer_position);
        return item;
    })
    return processData
}

module.exports = {
    convert
}