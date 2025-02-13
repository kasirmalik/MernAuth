import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDb } from './db/connectDb.js';
import authRoutes from './routes/authroute.js';
import cors from 'cors';

// Load environment variables from .env file
dotenv.config();

 // Debugging line to print all environment variables

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json()); // to parse the incoming request with JSON payloads 
app.use(cookieParser());

app.use("/api/auth",authRoutes);

app.listen(PORT, () => {
    connectDb();
    console.log(`server is running on port `, PORT);
});