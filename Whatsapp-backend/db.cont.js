const mongoose = require('mongoose');

const mongoDB_url =
  'mongodb+srv://user:aliali@crud.nfwxh.mongodb.net/';

const connectDB = async () => {
  try {
    mongoose.connect(mongoDB_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("successfully connected");
  } catch (err) {
    console.log("error:::====>",err);
  }
};
module.exports = connectDB;
