const jwt = require("jsonwebtoken");
const {
  jwtSecret,
  jwtExpiration,
  jwtRefresshExpiration,
} = require("../config");

const createJWT = async ({ payload }) => {
    const token = jwt.sign(payload, jwtSecret, {
        expiresIn: jwtExpiration,
    });
    return token;
}

const isTokenValid = async ({token}) => jwt.verify(token, jwtSecret);

module.exports = {
    createJWT,
    isTokenValid,
}