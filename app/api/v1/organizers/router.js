const express = require("express");
const router = express.Router();

const { createCMSOrganizer } = require("./controller");
const {
    authenticateUser,
    authorizeRoles,
  } = require("../../../middlewares/auth");

router.post("/organizers", createCMSOrganizer);

module.exports = router;
