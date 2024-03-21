import { Request, Response } from "express";
import User from "../models/user";
import { validateAccessToken } from "../security/accessToken";
import { JwtPayload } from "jsonwebtoken";
import Jwt  from "jsonwebtoken";

interface AuthenticatedRequest<T = Record<string, any>> extends Request<T> {
    user?: JwtPayload;
}

const authenticateLogin = async (req: AuthenticatedRequest, res: Response, next: Function) => {
    const token = req.headers["Authorization"];

    if (!token || typeof token !== "string") {
        return res.status(401).json({
          status: "Fail",
          message: "Please logIn to continue!",
        });
    }

    try {
        const decoded = validateAccessToken(token) as JwtPayload;
        
        if (decoded) {
            req.user = decoded; // store decoded token payload
        } else {
            return res.status(401).json({
                status: "Fail",
                message: "Unauthorized, Please logIn to continue!",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(409).json({
          status: "Fail",
          message: "Please logIn to continue!",
        });
    }
    next(); // Make sure to call next() to proceed to the next middleware or route handler
};

export default authenticateLogin;
