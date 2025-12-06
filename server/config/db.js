import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectToMongo = async () => {
    try {
        const uri = process.env.MONGO_URI_CLOUD;

        console.log("Trying Mongo URI:", uri || "Not defined");

        await mongoose.connect(uri);
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.error("MongoDB connection failed:", err.message);
        process.exit(1);
    }
};

export default connectToMongo;
 