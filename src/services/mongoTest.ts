import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

mongoose.connection.on("open", () => {
    console.info(JSON.stringify({ message: "mongo test Database Connected" }));
});

mongoose.connection.on("error", (error) => {
    console.error(JSON.stringify({ message: "Something went wrong", error: error }));
});

const testConnect = async () => { 
    const url = process.env.TEST_DATABASE_URL;
    await mongoose.connect(url as string);
}

const testDisconnect = async () => {
    await mongoose.disconnect();
}

export default { testConnect, testDisconnect };
