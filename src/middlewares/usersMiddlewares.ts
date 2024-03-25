import { Request, Response } from "express";
import validateUser from '../validation/usersValidation';

const isValidUser = (req:Request, res:Response, next:Function) => {
    const { error } = validateUser(req.body);
  
    if ( error ) {
      return res.status(400).json({
        status: "Fail",
        message: error.details[0].message
      })
    }
  
    try {
      next();
    } catch (error) {
      console.error(error)
    }
  };

  export default isValidUser;