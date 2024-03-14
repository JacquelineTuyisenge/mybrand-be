// database
import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

mongoose.connection.on("open", () => {
    console.info("Database Connected")
}) // events

mongoose.connection.on("close", () => {
    console.info("Something went wrong") // when connection is not there
}) 

const mongoConnect = async () => { 
    const url = process.env.DATABASE_URL;
    await mongoose
    .connect(url as string)
}
const mongoDisconnect = async () => {
    await mongoose.disconnect();
}

export { mongoConnect, mongoDisconnect }; // exporting