import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("DB Connected");
  } catch (error) {
    console.log({ error });
  }
}
