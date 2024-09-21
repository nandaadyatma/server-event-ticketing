const Users = require("../../api/v1/users/model");
const { BadRequestError, UnauthorizedError } = require("../../errors");
const { getUserData, createJWT } = require("../../utils");

const signin = async (req) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email dan password");
  }

  const result = await Users.findOne({ email: email });
  if (!result) {
    throw new UnauthorizedError(`User with email ${email} not found`);
  }

  const isPasswordCorrect = await result.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthorizedError("Invalid Credentials");
  }
  const token = await createJWT({ payload: getUserData(result)})

  return token;
};

module.exports = { signin }
