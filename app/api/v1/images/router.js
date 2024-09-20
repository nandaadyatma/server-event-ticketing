const express = require('express');
const router = express.Router();

const { create } = require('./controller');

//import product controller
const uploadMiddleware = require('../../../middlewares/multer');

router.post('/images', uploadMiddleware.single('avatar'), create)



module.exports = router;

