const {
  getAllTalents,
  getOneTalent,
  updateTalents,
  createTalents,
  deleteTalents,
} = require("../../../services/mongoose/talents");

const { StatusCodes } = require("http-status-codes");

const create = async (req, res, next) => {
  try {
    const result = await createTalents(req);

    return res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const index = async (req, res, next) => {
  try {
    const result = await getAllTalents(req);

    return res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};


const find = async (req, res, next) => {
    try {
        const result = await getOneTalent(req);

        return res.status(StatusCodes.OK).json({
            data: result,
          });
    } catch (error) {
        next(error);
    }
}

const update = async (req, res, next) => {
    try {
        const result = await updateTalents(req);

        return res.status(StatusCodes.OK).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
      const result = await deleteTalents(req);
  
      return res.status(StatusCodes.OK).json({
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };


  module.exports = {
    index,
    find,
    update,
    destroy,
    create,
  }