//  (1) import mongoose
const mongoose = require('mongoose');

// (2) mengambil DB URL dari config
const { urlDB } = require('../config');

// (3) connect with DB
mongoose.connect(urlDB);

// (4) get a connection
const db = mongoose.connection;

module.exports = db;