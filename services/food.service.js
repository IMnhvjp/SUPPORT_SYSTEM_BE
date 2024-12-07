const foodRepository = require("../repository/food.repository.js");
const converter = require("../converter");
const lodash = require("lodash");
const search = async ({type, time, lat,long, min_price, max_price,calo = 500}) => {
    try {
        const result = {};
        // raw data
        let data = (await foodRepository.getAllFood({type, time}))
        .map(item => {
            const dataValues = item.dataValues;
            return {
                name: dataValues.name,
                description: dataValues.description,
                price: dataValues.price,
                calo: dataValues.calo,
                total_like: dataValues.total_like,
                restaurant_name: dataValues.restaurant.place,
                restaurant_latitude: dataValues.restaurant.latitude,
                restaurant_longitude: dataValues.restaurant.longitude,
                restaurant_total_review: dataValues.restaurant.total_review,
                restaurant_avg_rating: dataValues.restaurant.avg_rating,
            }
        });
        result[0] = lodash.cloneDeep(data);

        // convert data
        data = converter.caloConverter.convert(data, calo);
        data = converter.positionConverter.convert(data, lat, long);
        data = converter.priceConverter.convert(data, min_price, max_price);
        data = converter.totalLikeConverter.convert(data);
        result[1] = lodash.cloneDeep(data);

        //TODO BUOC 2
        //TODO BUOC 3
        //TODO BUOC 4
        //TODO BUOC 5
        
        return {
            data: result,
            status: 200,
        }
    }
    catch (e) {
        console.log(e);
        return  {
            message: e.message,
            status: 500
        }
    }
}
module.exports = {
    search
}