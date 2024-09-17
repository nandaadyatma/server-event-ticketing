const Images = require("../../api/v1/images/model");
const { NotFoundError } = require("../../errors");

// cara 1
const createImages = async (req) => {
  const result = await Images.create({
    url: req.file
      ? `uploads/${req.file.filename}`
      : `uploads/avatar/default.jpeg`,
  });

  return result;
};

// cara 2
const generateUrlImage = async (req) => {
  const result = `uploads/${req.file.filename}`;

  return result;
};

const checkingImage = async (id) => {
  const result = await Images.findOne({ _id: id });
  console.log(result);

  if (!result) throw new NotFoundError(`There's no image with id: ${id}`);

  return result;
};

module.exports = { createImages, generateUrlImage, checkingImage };
