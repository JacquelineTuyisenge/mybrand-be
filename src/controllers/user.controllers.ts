import { Request, Response } from 'express';
import User from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

interface AuthenticatedRequest<T = Record<string, any>> extends Request<T> {
    user?: any;
  }

// create user/sign up
const createUser = async (req: Request, res: Response): Promise<void> => {

    try {

        const user = req.body;

        const userExists = await User.findOne({ email: req.body.email });

        if (userExists) {
            res.status(400).json({
                status: 400,
                message: `Email ${req.body.email} already exists!`
            });
            return;
        }
        // When a new user signs up, their password is hashed using bcrypt for security

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const hashedConfirmPassword = await bcrypt.hash(req.body.confirmPassword, salt);

        // hashed password is stored along with other user details in the database
        const newUser = new User({
            fullName: req.body.fullName,
            email: req.body.email,
            password: hashedPassword,
            confirmPassword: hashedConfirmPassword,
            role: req.body.role
        });

        await newUser.save();


        res.status(201).json({
            status: 201,
            message: "User created successfully!",
            email: req.body.email
        });
    } catch(error) {
        console.log(error);
        
        res.status(500).json({
            status: 500, 
            message: 'Something went wrong!'
        });
    }
};

const logIn = async (req: Request, res: Response) => {
    const {email, password} = req.body;

    if(!(email && password)){
        res.status(400).json({
            message: "All fields must exist"
        });
    } 
    // if user exist
    const userAvailable = await User.findOne({ email: req.body.email });

    if (!userAvailable) {
        return res.status(409).json({
         status: 409,
          message: "Wrong credentials. Please register!",
        });
      }
    //  compare the provided password with the hashed password stored in the database.
    const isMatch = userAvailable ? await bcrypt.compare(req.body.password, userAvailable.password) : false;

    if (!isMatch) {
    
        res.status(404).json({
            status: 404,
            message: 'Wrong credentials, try again!'
        });
    }

    try {
        // generateAccessToken(user._id, user.role);
        const secretKey = process.env.ACCESS_TOKEN_KEY!;

        const token = jwt.sign(
            {
                id: userAvailable._id,
                fullName: userAvailable.fullName,
                role: userAvailable.role
            },
            secretKey as string,
            { expiresIn: '1d' }
        );

        res.status(200).json({
            status: 200,
            message: "user logged in successfully!",
            token: token
        });
    } catch(error){
        console.error(error);
           res.status(500).json({message: error});
       }
};



const loggedInUser = async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user;

    try {
        const user = await User.findOne({ _id: userId });

        if (!user) {
            return res.status(404).json({
                status: "Fail",
                message: "User not found!",
            });
        }

        return res.status(200).json({
            status: "Success",
            message: "LoggedIn user fetched successfully!",
            user: {
                fullName: user?.fullName,
                email: user?.email,
                role: user?.role,
            },
        });

    } catch(error) {
        console.error(error);
        return res.status(500).json({
            status: "Error",
            message: "Something went wrong!",
        });
    }
};

const getAllUsers = async (req: AuthenticatedRequest, res: Response) => {

    try {

        console.log("Decoded user role:", req.user?.role);
        
        const token:any = req.headers.authorization?.split(" ")[1]; 

        const decoded: any = jwt.verify(token,   process.env.ACCESS_TOKEN_KEY || "thgvbdiuyfwgc" ) as JwtPayload;
        const user = await User.findOne({ _id: req.user});
        if (decoded?.role !== "Admin") {
            return res.status(403).json({
                status: 401,
                message: "Unauthorized, only Admins can do this!"
            });
        }

        const users = await User.find({});

        res.status(200).json({
            status: "Success",
            message: "Get all users is successful!",
            users: users,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "Error",
            message: "Something went wrong!",
        });
    }
};

const getSingleUser = async (req: AuthenticatedRequest, res: Response) => {

    try {
        const user = await User.findOne({ _id: req.user});
        const token:any = req.headers.authorization?.split(" ")[1]; 

        const decoded: any = jwt.verify(token,   process.env.ACCESS_TOKEN_KEY || "thgvbdiuyfwgc" ) as JwtPayload;

        if (decoded?.role !== "Admin") {
            return res.status(401).json({
                status: "Fail",
                message: "Unauthorized, only Admins can do this!"
            });
        }

        const id = req.params.id;
        const userRecord = await User.findById(id);

        if (!userRecord) {
            return res.status(404).json({
                status: "Fail",
                message: "User not found!",
            });
        }

        res.status(200).json({
            status: "Success",
            message: "fetching User is successful!",
            users: userRecord,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "Error",
            message: "Something went wrong!",
        });   
    }
};

const updateUser = async (req: AuthenticatedRequest, res: Response) => {

    const userId = req.user;

    const user = await User.findOne({ _id: userId });
    if(user?.role !== "Admin") {
        return res.status(401).json({
            status: "Fail",
            message: "Unauthorized, only Admins can do this!"
        });
    }

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

const deleteUser = async (req: AuthenticatedRequest, res: Response) => {

    const userId = req.user;

    const user = await User.findOne({ _id: userId });
    if(user?.role !== "Admin") {
        return res.status(401).json({
            status: "Fail",
            message: "Unauthorized, only Admins can do this!"
        });
        
    }


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
