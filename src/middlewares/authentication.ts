import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import { verifyAccessToken } from "../security/accessToken";
import { JwtPayload }  from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

interface ExpandRequest<T = Record<string, any>> extends Request<T> {
    UserId?: JwtPayload;
}

// const authenticateLogin = async (req: AuthenticatedRequest, res: Response, next: Function) => {
//     const token = req.headers["Authorization"];

//     if (!token || typeof token !== "string") {
//         return res.status(401).json({
//           status: "Fail",
//           message: "Please logIn to continue!",
//         });
//     }

//     try {
//         const decoded = validateAccessToken(token) as JwtPayload;
        
//         if (decoded) {
//             req.user = decoded; // store decoded token payload
//         } else {
//             return res.status(401).json({
//                 status: "Fail",
//                 message: "Unauthorized, Please logIn to continue!",
//             });
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(409).json({
//           status: "Fail",
//           message: "Please logIn to continue!",
//         });
//     }
//     next(); // Make sure to call next() to proceed to the next middleware or route handler
// };

const isAdmin = async (
    req: ExpandRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (!req.header("Authorization"))
        return res.status(401).json({ message: "Please sign in" });

      const token = req.header("Authorization")?.split(" ")[1];

      if (!token || typeof token !== "string") {
        return res
          .status(401)
          .json({ status: "401", message: "Unauthorized, Please logIn" });
      }
    //   const verifyAccessToken = <T>(data: T) => {
    //     const secret_key = process.env.ACCESS_TOKEN_KEY;
    //     return Jwt.verify(String(data), secret_key as string);
    //   };

      const decoded = verifyAccessToken(token) as JwtPayload;
      console.log(decoded);

      if (decoded) {
        req.UserId = decoded._id;
        const id = req.UserId;

        const user = await User.findById(decoded._id);

        if (!user) {
          return res.status(404).json({ message: "user not found" });
        }
        if (user.role !== "admin") {
          return res.status(406).json({ message: "Ony for Admin" });
        }
      } next();
    } catch (error) {
      console.error(error);
      return res.status(400).json({ status: "400", message: "Bad  Requesting" });
    }
  };

  const authenticateLogin = async (
    req: ExpandRequest,
    res: Response,
    next: NextFunction
  ) => {
    try{
        if (!req.header("Authorization"))
        return res.status(401).json({ message: "Please sign in" });

        const token = req.header("Authorization")?.split(" ")[1];

        if (!token || typeof token !== "string") {
          return res
            .status(401)
            .json({ status: "401", message: "Unauthorized, Please logIn" });
        }
        // const verifyAccessToken = <T>(data: T) => {
        //   const secret_key = process.env.ACCESS_TOKEN_KEY;
        //   return Jwt.verify(String(data), secret_key as string);
        // };
        const decoded = verifyAccessToken(token) as JwtPayload;
        if (decoded) {
          req.UserId = decoded._id;
          const id = req.UserId;
          const user = await User.findById(id);

          if (!user){
            return res
              .status(404)
              .json({ status: "404", message: "user not found" });
          }
          next();
        } 
    } catch (error) {
      console.error(error);
      return res.status(400).json({ status: "400", message: "Bad Request" });
    }
  };

export default { authenticateLogin, isAdmin };
