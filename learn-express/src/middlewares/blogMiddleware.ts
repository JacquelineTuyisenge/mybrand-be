import { Request, Response } from "express";
const { valid } = require('joi');
import validateBlog from '../validation/blogs';

const isValid = (req: Request, res: Response, next: Function) => {
    const {error} = validateBlog(req.body);
    console.log(error);

    if (error){
         return res.status(400).json({message: error.details[0].message});
    }
    
    // if no error, middle ware continues
    try{
        next()
    } catch(error){
        console.log('error', error);
    }
};

export default isValid;