const mathjs = require("mathjs");
const helper = require("../utils/helper.js")

const convert = (rawData, min_expect, max_expect, priceDiff) => {
    const processedData = rawData.map(item => {
        // const processed_min_expect = helper.function_f(min_expect, item.original_price, priceDiff);
        // const processed_max_expect = helper.function_f(max_expect, item.original_price, priceDiff);
        const expected_value = mathjs.divide(min_expect + max_expect, 2);
        item.processed_value = mathjs.divide(1, mathjs.add(1, mathjs.exp(mathjs.divide(mathjs.subtract(item.original_price, expected_value)))))
        return item;
    })
    return processedData
}

module.exports = {
    convert
}