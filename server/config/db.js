// import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config();

// const connectToMongo = async () => {
//     try {
//         const uri = process.env.MONGO_URI_CLOUD;

//         console.log("Trying Mongo URI:", uri || "Not defined");

//         await mongoose.connect(uri);
//         console.log("MongoDB connected successfully");
//     } catch (err) {
//         console.error("MongoDB connection failed:", err.message);
//         process.exit(1);
//     }
// };

// export default connectToMongo;
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectToMongo = async () => {
    try {
<<<<<<< HEAD
        const res = await mongoose.connect("mongodb://localhost:27017/blog_project");
        console.log("successfully connected");
    } catch (error) {
        console.log("fetch error");
    }
}
export default connectToMongo;
=======
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
>>>>>>> 7986114637cd9baf7e6198b8e065319dd21b140d
