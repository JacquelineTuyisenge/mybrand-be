import { Request, Response } from 'express';
import User from '../models/user';
import bcrypt from 'bcryptjs';
import { generateAccessToken } from '../security/accessToken';

// create user/sign up
const createUser = async (req: Request, res: Response): Promise<void> => {
    // check if user is already logged in
    const user = await User.findOne({ email: req.body.email });

    if (user) {
        res.status(400).json({
            status: 'error',
            message: `email ${req.body.email} already exist!`
        });
    }

    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const hashedConfirmPassword = await bcrypt.hash(req.body.confirmPassword, salt);

        const newUser = new User({
            fullName: req.body.fullName,
            email: req.body.email,
            password: hashedPassword,
            confirmPassword: hashedConfirmPassword
        });
        await newUser.save();

        res.status(201).json({
            status: "Success",
            message: "User creation is successful!"
        });
    } catch(error) {
        console.error(error);
        res.status(500).json({
            status: 'Fail',
            message: 'Something went wrong!'
        });
    }
};

const logIn = async (req: Request, res: Response) => {
    //if user is there
    const user = await User.findOne({ email: req.body.email });

    // if user exist or password matches
    const isPasswordTrue = user ? await bcrypt.compare(req.body.password, user.password) : false;

    if (!isPasswordTrue) {
    // If user is not found or password doesn't match
        res.status(400).json({
            status: 'error',
            message: 'Invalid credentials, try again!'
        });
    }

    try {
        const token = generateAccessToken(user);

        res.status(200).json({
            status: "Success",
            message: "user loggin is successful!",
            token: token
        });
    } catch (error){
        console.error(error)
        res.status(500).json({
            status: "Error",
            message: "Something went wrong!"
        });
    }
};

interface AuthenticatedRequest<T = Record<string, any>> extends Request<T> {
    user?: any;
}

const loggedInUser = async (req: AuthenticatedRequest, res: Response) => {
    const { user } = req;

    if (user) {
        return res.status(200).json({
            status: "Success",
            message: "user fetching is successful!",
            user: user
        })
    } else {
        return res.status(400).json({
            status: "Fail",
            message: "User not found!",
        });
    }
};

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find({});

        res.status(200).json({
            status: "Success",
            message: "Get all users is successful!",
            users: users
        });
    } catch(error){
        console.error(error)
        res.status(500).json({
            status: 'Fail',
            message: 'Something went wrong'
        });
    }
};

const getSingleUser = async (req:Request, res: Response) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                status: "Fail",
                message: "User not found!",
            });
        }

        res.status(200).json({
            status: "Success",
            message: "fetching User is successful!",
            users: user,
        });
    } catch(error){
        console.error(error)
        res.status(500).json({
            status: "Fail",
            message: "Something Went Wrong!"
        });
    }
};

const updateUser = async (req: Request, res: Response) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const hashedConfirmPassword = await bcrypt.hash(req.body.confirmPassword, salt);

        const user = await User.findByIdAndUpdate(req.params.id, {
            fullName: req.body.fullName,
            email: req.body.email,
            password: hashedPassword,
            confirmPassword: hashedConfirmPassword
        },
        { new: true }
        );

        if (!user) {
            return res.status(404).json({
               status: "Fail",
               message: "User not found!",
            });
        }
        await user?.save();

        res.status(200).json({
            status: "Success",
            message: "user upadated sucessfully!",
            users: user
        });
    } catch (error) {
        res.status(500).json({
            status: "Fail",
            message: "Something Went Wrong!"
        });
    }
};

const deleteUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const user = await User.findByIdAndDelete(id);

        if(!user) {
            return res.status(404).json({
                status: "Fail",
                message: "User not found!",
            });
        }

        res.status(200).json({
            status: "Success",
            message: "User deleted successfully!"
        });

    } catch (error) {
        res.status(500).json({
            status: "Fail",
            message: "Something Went Wrong!"
        });
    }
};

export default {createUser, logIn, loggedInUser, getAllUsers, getSingleUser, updateUser, deleteUser};
