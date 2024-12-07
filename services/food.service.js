const foodRepository = require("../repository/food.repository.js");

const search = async ({type, time}) => {
    try {
        const data = await foodRepository.getAllFood({type, time});
        return {
            data: data,
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