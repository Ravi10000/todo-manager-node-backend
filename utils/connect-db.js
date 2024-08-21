import mongoose from "mongoose";

export async function connectDB() {
    try {
        console.log({URI : process.env.DB_URI});
        
        await mongoose.connect(process.env.DB_URI);
        console.log("connect to DB");
        
    } catch (error) {
        console.log({ error });
    }   
}