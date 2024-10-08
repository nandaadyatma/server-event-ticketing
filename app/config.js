const dotenv = require('dotenv');
dotenv.config();


module.exports = {
    urlDB : process.env.URL_MONGODB_DEV,
    jwtExpiration: process.env.JWT_EXPIRATION,
    jwtSecret: process.env.TOKEN_SECRET,

};