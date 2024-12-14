const foodRepository = require("../repository/food.repository.js");
const converter = require("../converter");
const lodash = require("lodash");
const mathjs = require("mathjs");
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
                original_price: dataValues.price,
                original_calo: dataValues.calo,
                original_rating: dataValues.total_like,
                distance: -1,
                processed_price: -1,
                processed_calo: -1,
                processed_rating: -1,
                total_like: dataValues.total_like,
                restaurant_name: dataValues.restaurant.place,
                restaurant_latitude: dataValues.restaurant.latitude,
                restaurant_longitude: dataValues.restaurant.longitude,
                restaurant_total_review: dataValues.restaurant.total_review,
                restaurant_avg_rating: dataValues.restaurant.avg_rating,
                s_asterisk: -1,
                s_minus: -1,
                c_asterisk: -1
            }
        });
        result[0] = {
            worst_scenerio: null,
            best_scenerio: null,
            rows: lodash.cloneDeep(data)
        }

        // convert data
        const max_actual_price = lodash.maxBy(data, "original_price").original_price;
        const min_actual_price = lodash.minBy(data, "original_price").original_price;
        data = converter.caloConverter.convert(data, calo);
        data = converter.positionConverter.convert(data, lat, long);
        data = converter.priceConverter.convert(data, min_price, max_price, max_actual_price - min_actual_price);
        // data = converter.totalLikeConverter.convert(data);
        result[1] = {
            worst_scenerio: null,
            best_scenerio: null,
            rows: lodash.cloneDeep(data)
        }

        //TODO BUOC 1: Chuan hoa
        const max_distance = lodash.maxBy(data, "distance").distance;
        const {sum_square_rating, sum_square_calo, sum_square_price, sum_square_distance} = data.reduce((acc, curr) => {
            curr.processed_price = max_actual_price - curr.processed_price;
            curr.distance = max_distance - curr.distance;
            acc.sum_square_calo += mathjs.pow(curr.processed_calo, 2);
            acc.sum_square_rating += mathjs.pow(curr.processed_rating, 2);
            acc.sum_square_distance += mathjs.pow(curr.distance, 2);
            acc.sum_square_price += mathjs.pow(curr.processed_price, 2);
            return acc;
        }, {
            sum_square_calo: 0,
            sum_square_rating: 0,
            sum_square_price: 0,
            sum_square_distance: 0
        })
        data.forEach(curr => {
            curr.processed_price = mathjs.divide(curr.processed_price, mathjs.sqrt(sum_square_price));
            curr.processed_calo = mathjs.divide(curr.processed_calo, mathjs.sqrt(sum_square_calo));
            curr.processed_rating = mathjs.divide(curr.processed_rating, mathjs.sqrt(sum_square_rating));
            curr.distance = mathjs.divide(curr.distance, mathjs.sqrt(sum_square_distance));
        })
        result[2] = {
            worst_scenerio: null,
            best_scenerio: null,
            rows: lodash.cloneDeep(data)
        }

        //TODO BUOC 2: tinh theo trong so
        data.forEach(curr => {
            curr.processed_price = 0.25 * curr.processed_price
            curr.processed_calo = 0.25 * curr.processed_calo
            curr.processed_rating = 0.25 * curr.processed_rating
            curr.distance = 0.25 * curr.distance
        })
        result[3] = {
            worst_scenerio: null,
            best_scenerio: null,
            rows: lodash.cloneDeep(data)
        }
        //TODO BUOC 4: giai phap ly tuong
        const best_scenerio = {
            processed_price: lodash.maxBy(data, 'processed_price').processed_price,
            processed_rating: lodash.maxBy(data, 'processed_rating').processed_rating,
            processed_calo: lodash.maxBy(data, 'processed_calo').processed_calo,
            distance: lodash.maxBy(data, 'distance').distance
        }
        const worst_scenerio = {
            processed_price: lodash.minBy(data, 'processed_price').processed_price,
            processed_rating: lodash.minBy(data, 'processed_rating').processed_rating,
            processed_calo: lodash.minBy(data, 'processed_calo').processed_calo,
            distance: lodash.minBy(data, 'distance').distance
        }
        result[4] = {
            worst_scenerio,
            best_scenerio,
            rows: lodash.cloneDeep(data)
        }
        //TODO BUOC 5
        const attributes = ["processed_rating", "processed_calo", "distance", "processed_price"]
        data.forEach(curr => {
            const {best_scenerio_diff, worst_scenerio_diff} = attributes.reduce((acc, attribute) => {
                acc.best_scenerio_diff += mathjs.pow(mathjs.subtract(curr[attribute], best_scenerio[attribute]), 2);
                acc.worst_scenerio_diff += mathjs.pow(mathjs.subtract(curr[attribute], worst_scenerio[attribute]), 2);
                return acc;
            }, {
                best_scenerio_diff: 0,
                worst_scenerio_diff: 0
            })
            curr.s_asterisk = mathjs.sqrt(best_scenerio_diff);
            curr.s_minus = mathjs.sqrt(worst_scenerio_diff);
            curr.c_asterisk = mathjs.divide(curr.s_minus, mathjs.add(curr.s_asterisk, curr.s_minus)); 
        })
        result[5] = {
            worst_scenerio,
            best_scenerio,
            rows: lodash.cloneDeep(lodash.sortBy(data, function(o) { return mathjs.multiply(o.c_asterisk, -1); }))
        }
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