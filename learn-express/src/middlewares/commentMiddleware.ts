import { Request, Response } from "express";
const { valid } = require('joi');
import validateComment from '../validation/commentsValidation';

const isValidComment = (req: Request, res: Response, next: Function) => {
    const {error} = validateComment(req.body);

    if (error) {
        return res.status(400).json(
            {message: error.details[0].message
        });
    }
    try {
        next();
    } catch(error) {
        console.error(error);
    }
}

export default isValidComment;