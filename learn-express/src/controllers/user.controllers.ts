import { Request, Response } from 'express';
import User from '../models/user';
import bcrypt from 'bcryptjs';
import { generateAccessToken } from '../security/accessToken';

interface AuthenticatedRequest<T = Record<string, any>> extends Request<T> {
    user?: any;
  }

// create user/sign up
const createUser = async (req: Request, res: Response): Promise<void> => {
    // const { fullName, email, password, confirmPassword, role } = req.body;
    // check if user is already logged in
    // const user = await User.findOne({ email: req.body.email });

    // if (user) {
    //     res.status(400).json({
    //         status: 'error',
    //         message: `email ${req.body.email} already exist!`
    //     });
    // }

    try {
        const userExists = await User.findOne({ email: req.body.email });

        if (userExists) {
            res.status(400).json({
                status: 'error',
                message: `Email ${req.body.email} already exists!`
            });
            return;
        }
        // When a new user signs up, their password is hashed using bcrypt for security
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const hashedConfirmPassword = await bcrypt.hash(req.body.confirmPassword, salt);
        // const user = await user.create({})

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
            status: "Success",
            message: "User creation is successful!"
        });
    } catch(error) {
        console.log(error);
        res.status(500).json({
            status: 'Fail',
            message: 'Something went wrong!'
        });
    }
};

const logIn = async (req: Request, res: Response) => {
    // const { email, password } = req.body;
    //if user is there
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return res.status(400).json({
          status: "Fail",
          message: "Wrong credentials. Please try again!",
        });
      }
    //  compare the provided password with the hashed password stored in the database.
    const isPasswordTrue = user ? await bcrypt.compare(req.body.password, user.password) : false;

    if (!isPasswordTrue) {
    // If user is not found or password doesn't match
        res.status(404).json({
            status: 'error',
            message: 'Wrong credentials, try again!'
        });
    }

    try {
        const token = generateAccessToken(user._id, user.role);


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
        
        const user = await User.findOne({ _id: req.user});
        if (user?.role !== "Admin") {
            return res.status(401).json({
                status: "Fail",
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
        if (user?.role !== "Admin") {
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
    if(user?.role === "User") {
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
    if(user?.role === "User") {
        
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
