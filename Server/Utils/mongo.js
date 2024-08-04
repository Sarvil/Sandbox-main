const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI;

const connectDb = async () => {
    try {
        await mongoose.connect(URI);
        console.log("Connection to Database is Successful");
    } catch (error) {
        console.log(error);
        console.error("Database Connection Failed");
        process.exit(0);
    }
};

module.exports = connectDb;