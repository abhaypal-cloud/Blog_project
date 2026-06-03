import mongoose from "mongoose";

const connectToMongo = async () => {
  try {
    const uri = "mongodb://127.0.0.1:27017/blogdb";

    console.log("Trying Mongo URI:", uri);

    await mongoose.connect(uri);

    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

export default connectToMongo;