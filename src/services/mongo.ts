// database
import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

mongoose.connection.on("open", () => {
    console.info(JSON.stringify({ message: "portfolio Database Connected" }))
}) // events

mongoose.connection.on("close", () => {
    console.info(JSON.stringify({ message: "Something went wrong" })) // when connection is not there("Something went wrong") // when connection is not there
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