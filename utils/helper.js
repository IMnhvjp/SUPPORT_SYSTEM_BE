const mathjs = require("mathjs");
const lodash = require("lodash")
const moment = require("moment")
const isOpened = (currTime, availableTimes) => {
    try {
        let [day, time] =  currTime.split('-');
        const processedAvailableTimes = availableTimes.reduce((acc, curr) => {
            const [day, openTime, closeTime] = curr.split('-');
            acc[day] =  {
                openTime,
                closeTime
            }
            return acc;
        },{});
        const {openTime, closeTime} =  processedAvailableTimes[day];
        // const formatted_time = lodash.padStart((time || 9).toString(), 2, '0');
        time = moment(time, "h:mm").format("HH:MM");
        return (openTime <= time && time <= closeTime);
    }
    catch (e) {
        console.log(e);
        return false
    }
}
const function_f = (wanted_value, actual_value, weight) => {
    const value = mathjs.exp(mathjs.multiply(mathjs.divide(mathjs.pow(mathjs.subtract(actual_value, wanted_value), 2), weight), -1));
    return value
} 

module.exports = {
    isOpened,
    function_f
}