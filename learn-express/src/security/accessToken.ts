import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

export const generateAccessToken = (userId: any, role: string) => {

    const tokenKey = process.env.ACCESS_TOKEN_KEY;

    const token = jwt.sign(
        { userId, role },
        tokenKey as string,
        {
            expiresIn: "10 min"
        }
    );

    return token;
}

export const validateAccessToken = (token: string): jwt.JwtPayload => { 
    try {
        const tokenKey = process.env.ACCESS_TOKEN_KEY;
        return jwt.verify(token, tokenKey as string) as jwt.JwtPayload;
    } catch (error) {
        // console.error("Error validating access token:", error);
        throw new Error("Invalid access token"); // Throw an error to indicate invalid token
    }
}


