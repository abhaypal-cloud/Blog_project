import express from "express";
import cors from "cors";
import connectToMongo from "./config/db.js";
import authRoutes from "./routes/blog.js";
import multer from "multer";
<<<<<<< HEAD
// import 'dotenv/config'

=======
import 'dotenv/config'
>>>>>>> 7986114637cd9baf7e6198b8e065319dd21b140d

const app = express();
const PORT = process.env.PORT || 9000;

connectToMongo();

<<<<<<< HEAD
app.use(cors({}));
=======
// --- START OF FIX ---
// We replaced app.use(cors()) with this configuration:
app.use(cors({
    origin: "https://blog-project-1-5ih2.onrender.com", // Your exact frontend URL
    credentials: true, // Allows cookies/headers to be sent
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
// --- END OF FIX ---
>>>>>>> 7986114637cd9baf7e6198b8e065319dd21b140d

app.use(express.json());
app.use(express.static("public/upload"));

app.get("/", (req, res) => {
    res.send("API is running..");
});

// API Routes
app.use("/api/v1", authRoutes);

app.listen(PORT, () => {
    console.log(`API is running on http://localhost:${PORT}`);
});
