import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        console.log('mongo_uri: ', process.env.MONGO_URI); 
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`db connected: ${conn.connection.host}`); 
    } catch (error) {
        console.log('error connecting to db: ', error.message); 
        process.exit(1); // '0' הוא הצלחה, '1' הוא כישלון
    }
};
