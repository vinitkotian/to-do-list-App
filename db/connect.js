const mongoose = require("mongoose");

const establishClusterConnection = async (connectionString) => {
  try {
    await mongoose.connect(connectionString);
    console.log("DB cluster is now connected.");
  } catch (e) {
    console.log("Error enocountered : ", e);
  }
};

module.exports = establishClusterConnection;
