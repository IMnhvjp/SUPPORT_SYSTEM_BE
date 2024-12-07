const typeService = require("../services/type.service.js");

const searchAll = async (req, res) => {
    try {
        const response = await typeService.searchAll();
        if (response.status === 200) {
            return res.status(200).json(response.data);
        }
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            message: e.message
        })
    }
}

module.exports = {
    searchAll
}