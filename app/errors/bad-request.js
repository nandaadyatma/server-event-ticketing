const { StatusCodes } = require('http-status-codes');

const CustomAPIError = require('./custom-api-error');

class BadRequest extends CustomAPIError {
    constructor(message) {
        super(message);
        // give status code
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}
module.exports = BadRequest;