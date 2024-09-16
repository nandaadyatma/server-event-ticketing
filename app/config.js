const dotenv = require('dotenv');
dotenv.config();


module.exports = {
    urlDB : process.env.URL_MONGODB_DEV,
};