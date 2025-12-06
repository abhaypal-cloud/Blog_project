import express from "express";
import cors from "cors";
import connectToMongo from "./config/db.js";
import authRoutes from "./routes/blog.js";
import multer from "multer";

import 'dotenv/config'




const app = express();
const PORT = process.env.PORT || 9000;

connectToMongo();

// app.use(cors({}));
// --- ROBUST CORS CONFIGURATION ---
const allowedOrigins = [
//   "https://blog-project-1-5ih2.onrender.com", // Production Frontend
  "https://blog-application-wzq5.onrender.com"                      // <--- ADD THIS LINE (Local Frontend)
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // This requires the specific origin, not '*'
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
// --- START OF FIX ---
// We replaced app.use(cors()) with this configuration:
// app.use(cors({
//     origin: "http://localhost:3000", // Your exact frontend URL
//     credentials: true, // Allows cookies/headers to be sent
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"]
// }));
// --- END OF FIX ---


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
