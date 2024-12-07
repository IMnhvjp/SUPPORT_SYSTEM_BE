const mathjs = require("mathjs");
const helper = require("../utils/helper.js")

const convert = (rawData, min_expect, max_expect, priceDiff) => {
    const processedData = rawData.map(item => {
        const processed_min_expect = helper.function_f(min_expect, item.original_price, priceDiff);
        const processed_max_expect = helper.function_f(max_expect, item.original_price, priceDiff);
        item.processed_price = 4 * processed_min_expect + 1 * processed_max_expect;
        return item;
    })
    return processedData
}

module.exports = {
    convert
}