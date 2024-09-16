const Categories = require('./model');
const {
    getAllCategories,
    createCategories,
} = require('../../../services/mongoose/categories');

const create = async (req, res, next) => {
    try {
        const result = await createCategories(req);

        //give response
        return res.status(201).json({
            data: result
        })

    } catch (err) {
        next(err)
    }
};

const index = async (req, res, next) => {
    try {
        const result = await getAllCategories();
        res.status(200).json({
            data: result,
        });

    } catch (error) {
        next(error)
    }
}

const find = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await Categories.findOne({ _id: id })

        if (!result) {
            return res.status(404).json({
                message: "Category not found"
            });
        }

        res.status(200).json({
            data: result,
        });

    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body

        const isProduxtExist = await Categories.findOne({ _id: id })
        if (!isProduxtExist) {
            return res.status(404).json({
                message: "Category not found"
            });
        }

        if (!name) {
            return res.status(404).json({
                message: "Name is required"
            });
        }

        const result = await Categories.findOneAndUpdate({ _id: id, }, { name }, { new: true, runValidators: true })

        if (result) {
            return res.status(200).json({
                message: "Successfully update the category",
                data: result
            });
        }

    } catch (error) {
        next(error)
    }
};

const destroy = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await Categories.findByIdAndDelete(id);

        if (result) {
            return res.status(200).json({
                message: "Successfully delete data",
                data: result
            })
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    create,
    index,
    find,
    update,
    destroy,
}