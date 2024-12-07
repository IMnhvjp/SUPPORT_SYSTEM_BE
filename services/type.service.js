const typeRepository = require("../repository/type.repository.js");


const searchAll = async () => {
    try {
        const allTypes = await typeRepository.searchAll();
        return {
            status: 200,
            data: allTypes
        }
    }
    catch (e) {
        console.log(e);
        return {
            status: 500,
            message: e.message
        }
    }
}

module.exports = {
    searchAll
}