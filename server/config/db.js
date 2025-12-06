import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectToMongo = async () => {
    try {
        // This looks for the variable you set in Render/Vercel
        const uri = process.env.MONGO_URI_CLOUD;

        // Safety check to ensure the URI exists
        if (!uri) {
            console.error("Error: MONGO_URI_CLOUD is not defined in environment variables.");
            process.exit(1);
        }

        console.log("Connecting to MongoDB...");
        
        // Connect to the Cloud Database
        await mongoose.connect(uri);
        console.log("MongoDB connected successfully");
        
    } catch (err) {
        console.error("MongoDB connection failed:", err.message);
        process.exit(1);
    }
};

export default connectToMongo;
