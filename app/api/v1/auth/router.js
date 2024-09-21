const express = require("express");
const router = express.Router();

const { signinCms } = require("./controller");

router.post("/auth/login", signinCms);

module.exports = router;