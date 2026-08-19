const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed");
        console.error("Error name:", error.name);
        console.error("Error message:", error.message);
        console.error("Error code:", error.code);
        console.error("Error reason:", error.reason);
        
        process.exit(1);
    }
};

module.exports = connectDB;