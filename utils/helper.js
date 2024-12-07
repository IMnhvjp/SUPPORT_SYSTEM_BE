

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


module.exports = {
    isOpened
}