const mathjs = require("mathjs");

const isOpened = (currTime, availableTimes) => {
    try {
        const [day, time] =  currTime.split('-');
        const processedAvailableTimes = availableTimes.reduce((acc, curr) => {
            const [day, openTime, closeTime] = curr.split('-');
            acc[day] =  {
                openTime,
                closeTime
            }
            return acc;
        },{});
        const {openTime, closeTime} =  processedAvailableTimes[day];
        return (openTime <= time && time <= closeTime);
    }
    catch (e) {
        console.log(e);
        return false
    }
}
const function_f = (wanted_value, actual_value, weight) => {
    const value = mathjs.exp(mathjs.multiply(mathjs.divide(mathjs.abs(mathjs.subtract(actual_value, wanted_value)), weight), -1));
    console.log("Chi value is null", value)
    return value
} 

module.exports = {
    isOpened,
    function_f
}