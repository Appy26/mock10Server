const mongoose = require('mongoose');
require("dotenv").config()

const connection = mongoose.connect("mongodb+srv://aparnasingh:aparna@cluster0.tor3wft.mongodb.net/Socket")

module.exports = { connection };