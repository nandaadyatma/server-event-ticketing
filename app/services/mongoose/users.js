const Users = require("../../api/v1/users/model");
const Organizers = require("../../api/v1/organizers/model");
const { BadRequestError } = require("../../errors");
const {StatusCodes} = require("http-status-codes");

const createOrganizers = async (req) => {
  const { organizer, name, email, password, confirmPassword, role } = req.body;

  if (password !== confirmPassword) {
    throw new BadRequestError("password doesn't match with confirm password");
  }

  const result = await Organizers.create({ organizer });

  const users = await Users.create({
    email,
    name,
    password,
    organizer: result._id, //id
    role,
  });

  delete users._doc.password; //use _doc allow to modify document from db, delete password to remove sensitive password data to return to client

  return users;
};

const createUsers = async (req) => {
  const { organizer, name, email, password, confirmPassword, role } = req.body;

  if (password !== confirmPassword) {
    throw new BadRequestError("password doesn't match with confirm password");
  }

  const result = await Users.create({
    email,
    name,
    password,
    organizer: req.user.organizer, //id
    role,
  });
  
  delete result._doc.password; //use _doc allow to modify document from db, delete password to remove sensitive password data to return to client


  return result;
};

module.exports = {
  createOrganizers,
  createUsers,
};
