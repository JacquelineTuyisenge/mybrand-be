import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

export const generateAccessToken = (userId: any) => {

    const tokenKey = process.env.ACCESS_TOKEN_KEY;

    const token = jwt.sign(
        { userId },
        tokenKey as string,
        {
            expiresIn: "10 min"
        }
    );

    return token;
}

export const validateAccessToken = <T>(token: T) => { 
    const tokenKey = process.env.ACCESS_TOKEN_KEY;
    return jwt.verify(String(token), tokenKey as string)
}