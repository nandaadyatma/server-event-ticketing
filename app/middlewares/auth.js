const { isTokenValid } = require("../utils/jwt");
const { UnauthenticatedError, UnauthorizedError } = require("../errors");

const authenticateUser = async (req, res, next) => {
  try {
    let token;

    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      throw new UnauthenticatedError("Authenticatiuon invalid");
    }

    const payload = await isTokenValid({ token });

    req.user = {
      email: payload.email,
      name: payload.name,
      role: payload.role,
      organizer: payload.organizer,
      id: payload.userId,
    };

    next();
  } catch (error) {
    next(error);
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError("Unathorized to access this route");
    }
    next();
  };
};

module.exports = { authenticateUser, authorizeRoles};
