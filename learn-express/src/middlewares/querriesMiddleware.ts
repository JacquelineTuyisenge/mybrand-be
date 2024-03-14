import { Request, Response } from "express";
import validateQuerry from "../validation/querriesValidation";

const isValidQuerry = (req: Request, res: Response, next: Function) => {
    const {error} = validateQuerry(req.body);

    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        });
    }

    try {
        next();
    } catch(error){
        console.error('error', error);
    }
};

export default isValidQuerry;