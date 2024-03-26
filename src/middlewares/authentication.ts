// authentication.ts

import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import jwt, { JwtPayload, TokenExpiredError } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

interface ExpandRequest<T = Record<string, any>> extends Request {
  UserId?: JwtPayload;
  userFullName?: string;
}

const isAdmin = async (
  req: ExpandRequest,
  res: Response,
  next: NextFunction
) => {

  const headerValues = req.headers.authorization;
  if(!headerValues){
      return res.status(403).json({message: "access denied"});
  }

  const token: any = req.headers.authorization?.split(" ")[1];
  try {
    const decoded: any = jwt.verify(token, process.env.ACCESS_TOKEN_KEY || "thgvbdiuyfwgc") as JwtPayload;
    if(decoded.role !== "Admin" || !decoded){
      return res.status(401).json({message: "access denied"});
    }
    next();
  }catch(err){
    return res.status(401).json({message: "UnAuthorized!"});
  }
};

const authLogin = async (
  req: ExpandRequest,
  res: Response,
  next: NextFunction
) => {

  const headerValues = req.headers.authorization;

  if (!headerValues) {
    return res.status(403).json({ status: 401, message: "access denied" });
  }

  const token: any = req.headers.authorization?.split(" ")[1];
  try{
    const decoded: any = jwt.verify(token, process.env.ACCESS_TOKEN_KEY || "thgvbdiuyfwgc") as JwtPayload;

    if(!decoded){
      return res.status(401).json({ status: 403, message: "login to continue" });
    }

    req.userFullName = decoded.fullName;
    next();
  } catch(err){
    return res.status(401).json({ status: 401, message: "UnAuthorized!" });
  }
  // try {
  //   if (!req.header("Authorization"))
  //     return res.status(401).json({ status: "401", message: "Please sign in" });
  //   const token = req.header("Authorization")?.split(" ")[1] as string;

  //   // Check if token exists and is a valid JWT
  //   if (!token || token.split(".").length !== 3) {
  //     return res.status(401).json({ message: "Invalid token" });
  //   }

  //   const ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY;
  //   // const decoded = verifyAccessToken(token) as JwtPayload;
  //   const decoded: any = jwt.verify(token, ACCESS_TOKEN_KEY || "thgvbdiuyfwgc") as JwtPayload;


  //   if (decoded) {
  //     req.UserId = decoded._id;
  //     const id = req.UserId;
  //     const user = await User.findById(id);
  //     if (!user) {
  //       return res.status(404).json({ message: "user not found" });
  //     }
  //     next();
  //   }
  // } catch (error) {
  //   if (error instanceof TokenExpiredError) {
  //     return res.status(401).json({ message: "Token expired" });
  //   }
  //   console.error(error);
  //   return res.status(400).json({ status: "400", message: "Bad Request" });
  // }
};

export default { isAdmin, authLogin };
