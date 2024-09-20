const Categories = require("../../api/v1/categories/model");
const { BadRequestError, NotFoundError } = require("../../errors");

const getAllCategories = async () => {
  const result = await Categories.find();

  return result;
};

const createCategories = async (req) => {
  const { name } = req.body;

  // check is there same category is exist first
  const check = await Categories.findOne({ name });

  if (check) throw new BadRequestError("The category has duplicate name");

  const result = await Categories.create({ name });

  return result;
};

const getOneCategories = async (req) => {
  const { id } = req.params;

  const result = await Categories.findOne({ _id: id });

  if (!result) throw new NotFoundError(`There's no category with id: ${id}`);

  return result;
};

const updateCategories = async (req) => {
  const { id } = req.params;
  const { name } = req.body;

  // check is there exist same name in database
  const check = await Categories.findOne({
    name,
    _id: { $ne: id }, //ne for (not equal), to filter
  });

  //throw an error
  if (check) throw new BadRequestError("Category is duplicated");

  const result = await Categories.findOneAndUpdate(
    { _id: id },
    { name },
    { new: true, runValidatiors: true }
  );

  if (!result) throw new NotFoundError(`There's no category with id: ${id}`);

  return result;
};

const deleteCategories = async (req) => {
  const { id } = req.params;

  const check = await Categories.findOne({ _id: id });

  if (!check) throw new NotFoundError(`There's no category with id: ${id}`);

  const result = await Categories.findByIdAndDelete(id);

  return result;
};

const checkingCategories = async (id) => {
  const result = await Categories.findOne({ _id: id });

  if (!result) throw new NotFoundError(`There's no category with id: ${id}`);
  
  return result;
};

module.exports = {
  getAllCategories,
  createCategories,
  getOneCategories,
  updateCategories,
  deleteCategories,
  checkingCategories,
};
