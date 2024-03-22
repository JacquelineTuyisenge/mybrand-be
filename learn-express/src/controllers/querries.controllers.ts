import { Request, Response } from "express";
import Querry from "../models/querries";
import User from "../models/user";

interface AuthenticatedRequest<T = Record<string, any>> extends Request<T> {
    user?: any;
  }

// post querries
export const httpAddQuerries = async (req: Request, res: Response): Promise<void> => {
    try {
        const querry = new Querry({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        });

        await querry.save();

        res.status(201).json({
            status: "success",
            message: "Querry created successfully",
            querry: querry
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "Something went wrong"
        });
    }
};

//get all querries

const httpGetAllQuerries = async (req: AuthenticatedRequest, res: Response): Promise<void> => {

    const userId = req.user;

    const user = await User.findOne({ _id: userId });
    if (user?.role !== "Admin") {
        res.status(401).json({ error: "Unauthorized, only Admins can do this" });
        return;
    }

    try {
        const querries = await Querry.find({});

        res.status(200).json({
            status: "success",
            message: "Querries retrieved successfully",
            querries: querries
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "Something went wrong"
        });
    }
};

//get single querry
const httpGetQuerry = async (req: AuthenticatedRequest, res: Response): Promise<void> => {

    const userId = req.user;

    const user = await User.findOne({ _id: userId });
    if (user?.role !== "Admin") {
        res.status(401).json({ error: "Unauthorized, only Admins can do this" });
        return;
    }

    try {
        const id = req.params.id;

        const singleQuerry = await Querry.findById(id);

        if (!singleQuerry) {
            res.status(404).json({ 
                status: "Fail", 
                message: "Querry not found!",
            });
            return;
        }

        res.status(200).json({
            status: "Success",
            message: "Querry retrieved successfully",
            querry: singleQuerry,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "Fail",
            message: "Something went wrong"
        });
    }
};

// update querry

const httpUpdateQuerry = async (req: AuthenticatedRequest, res: Response): Promise<void> => {

    const userId = req.user;

    const user = await User.findOne({ _id: userId });
    if (user?.role !== "Admin") {
        res.status(401).json({ error: "Unauthorized, only Admins can do this" });
        return;
    }

    try {

        const id = req.params.id;

        const updatedQuerry = await Querry.findByIdAndUpdate(id, {
            name: req.body.name,
            email: req.body.email,
            message: req.body.message, 
        }, { new: true });

        if (!updatedQuerry) {
            res.status(404).json({ 
                status: "Fail", 
                message: "Querry not found!",
            });
            return;
        }

        await updatedQuerry?.save();

        res.status(200).json({
            status: "Success",
            message: "Querry updated successfully!",
            querry: updatedQuerry,
        });

    } catch (error){
        console.error(error);
        res.status(500).json({
            status: "Fail",
            message: "Something went wrong!",
        });
    }
};

//delete querry

const httpDeleteQuerry = async (req: AuthenticatedRequest, res: Response): Promise<void> => {

    const userId = req.user;

    const user = await User.findOne({ _id: userId });
    if (user?.role !== "Admin") {
        res.status(401).json({ error: "Unauthorized, only Admins can do this" });
        return;
    }

    try {
        const id = req.params.id;

        if(!id) {
            res.status(404).json({ 
                status: "Fail", 
                message: "Querry not found!",
            });
            return;
        }

        await Querry.findByIdAndDelete(id);

        res.status(200).json({
            status: "Success",
            message: "Querry deleted successfully!",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "Fail",
            message: "Something went wrong!",
        });
    }
};


export default { httpAddQuerries, httpGetAllQuerries, httpGetQuerry, httpUpdateQuerry, httpDeleteQuerry };