const { StatusCodes } = require("http-status-codes");
const { createImages } = require("../../../services/mongoose/images");

const create = async (req, res, next) => {
  try {
    console.log('req.file');
    console.log(req.file);
    const result = await createImages(req);

    return res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { create };