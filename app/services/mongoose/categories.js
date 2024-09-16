const Categories = require('../../api/v1/categories/model')

const getAllCategories = async () => {
    const result = await Categories.find();

    return result;
};

const createCategories = async (req) => {
    const { name } = req.body;

    const result = await Categories.create({ name });

    return result;
}


module.exports = {
    getAllCategories,
    createCategories,
};