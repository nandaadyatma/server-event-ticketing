const express = require("express");
const router = express.Router();

//import product controller
const { create, index, find, update, destroy } = require("./controller");

const {
  authenticateUser,
  authorizeRoles,
} = require("../../../middlewares/auth");

// app.use(authenticateUser);

router.get("/categories", authenticateUser, index);

router.get("/categories/:id", authenticateUser, find);

router.put("/categories/:id", update);

router.delete("/categories/:id", destroy);

router.post("/categories", authenticateUser, create);

module.exports = router;
