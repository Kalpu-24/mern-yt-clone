import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/users.js';
import videoRoutes from './routes/videos.js';
import commentRoutes from './routes/comments.js';
import authRoutes from './routes/auth.js';
import cookieParser from 'cookie-parser';
dotenv.config();
const app = express();
const connect = () => {
    mongoose.connect(process.env.MONG).then(() => console.log('MongoDB connected')).catch((err) => console.log(err));
}
app.use(cookieParser())
app.use(express.json());
app.use("/api/user",userRoutes)
app.use("/api/auth" , authRoutes)
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Something went wrong';
    return res.status(500).json({
        success: false,
        message,
        status
    })
});
app.listen(5000, () => {
    connect();
    console.log('Server is running on port 5000')
});