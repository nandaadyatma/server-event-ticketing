const {  StatusCodes } = require('http-status-codes')

const { createOrganizers } = require('../../../services/mongoose/users')

const createCMSOrganizer = async (req, res, next) => {
    try {
      const result = await createOrganizers(req);
  
      //give response
      return res.status(StatusCodes.CREATED).json({
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };

  module.exports = {
    createCMSOrganizer,
  }