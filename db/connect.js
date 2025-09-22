const mongoose = require("mongoose");

const DBConnection = (connectionString) => {
  return mongoose.connect(connectionString);
};

module.exports = DBConnection
