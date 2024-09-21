const { signin } = require("../../../services/mongoose/auth");

const { StatusCodes } = require("http-status-codes");

const signinCms = async (req, res, next) => {
  try {
    const result = await signin(req);

    return res.status(StatusCodes.OK).json({
      data: { token: result },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { signinCms };
