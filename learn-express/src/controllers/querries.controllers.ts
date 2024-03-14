import { Request, Response } from "express";
import Querry from "../models/querries";

// post querries
const httpAddQuerries = async (req: Request, res: Response): Promise<void> => {
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

const httpGetAllQuerries = async (req: Request, res: Response): Promise<void> => {
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
const httpGetQuerry = async (req: Request, res: Response): Promise<void> => {

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

const httpUpdateQuerry = async (req: Request, res: Response): Promise<void> => {
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

const httpDeleteQuerry = async (req: Request, res: Response): Promise<void> => {

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