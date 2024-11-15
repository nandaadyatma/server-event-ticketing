const express = require("express");
const router = express.Router();

const { createCMSOrganizer, createCMSUser } = require("./controller");
const {
    authenticateUser,
    authorizeRoles,
  } = require("../../../middlewares/auth");

router.post("/organizers", authenticateUser, authorizeRoles('organizer'), createCMSOrganizer);
router.post("/users", authenticateUser, createCMSUser);

module.exports = router;
