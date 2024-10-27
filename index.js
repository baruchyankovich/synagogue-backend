import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db/connectDB.js';
import authRoutes from './routes/auth.route.js';




dotenv.config();
const PORT=process.env.PORT ||5003

const app = express();

app.use(express.json())
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log('Server is running on port : ',PORT);
});

















