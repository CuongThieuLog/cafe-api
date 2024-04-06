let mongoose = require("mongoose");

const connect = async () => {
  try {
    mongoose.Promise = global.Promise;
    mongoose.connect(
      "mongodb+srv://devcuongthieu:16062002@cafe-db.gjytzws.mongodb.net/?retryWrites=true&w=majority&appName=cafe-db"
    );
    console.log("Connect DB successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connect;
