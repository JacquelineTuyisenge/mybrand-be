import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

export const generateAccessToken = (userId: any, role: string) => {

    const tokenSecret = process.env.ACCESS_TOKEN_KEY;
    // Openssl rand -base64 32
    const token = jwt.sign(
        { userId, role },
        tokenSecret as string,
        {
            expiresIn: "30 min"
        }
    );

    return token
}

export const verifyAccessToken = <T>(token: T) => {
    const tokenSecret = process.env.ACCESS_TOKEN_KEY;
    console.log(`token Secret is ${tokenSecret}`);

    return jwt.verify(String(token), tokenSecret as string)
}

