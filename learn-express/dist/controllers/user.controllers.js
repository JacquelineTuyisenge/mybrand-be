"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const accessToken_1 = require("../security/accessToken");
// create user/sign up
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const { fullName, email, password, confirmPassword, role } = req.body;
    // check if user is already logged in
    const user = yield user_1.default.findOne({ email: req.body.email });
    if (user) {
        res.status(400).json({
            status: 'error',
            message: `email ${req.body.email} already exist!`
        });
    }
    try {
        // When a new user signs up, their password is hashed using bcrypt for security
        const salt = yield bcryptjs_1.default.genSalt();
        const hashedPassword = yield bcryptjs_1.default.hash(req.body.password, salt);
        const hashedConfirmPassword = yield bcryptjs_1.default.hash(req.body.confirmPassword, salt);
        // const user = await user.create({})
        // hashed password is stored along with other user details in the database
        const newUser = new user_1.default({
            fullName: req.body.fullName,
            email: req.body.email,
            password: hashedPassword,
            confirmPassword: hashedConfirmPassword
        });
        yield newUser.save();
        res.status(201).json({
            status: "Success",
            message: "User creation is successful!"
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'Fail',
            message: 'Something went wrong!'
        });
    }
});
const logIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const { email, password } = req.body;
    //if user is there
    const user = yield user_1.default.findOne({ email: req.body.email });
    if (!user) {
        return res.status(409).json({
            status: "Fail",
            message: "Invalid user or password. Please try again!",
        });
    }
    //  compare the provided password with the hashed password stored in the database.
    const isPasswordTrue = user ? yield bcryptjs_1.default.compare(req.body.password, user.password) : false;
    if (!isPasswordTrue) {
        // If user is not found or password doesn't match
        res.status(400).json({
            status: 'error',
            message: 'Invalid credentials, try again!'
        });
    }
    try {
        const token = (0, accessToken_1.generateAccessToken)(user._id);
        res.status(200).json({
            status: "Success",
            message: "user loggin is successful!",
            token: token
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: "Error",
            message: "Something went wrong!"
        });
    }
});
const loggedInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user;
    const user = yield user_1.default.findOne({ _id: userId });
    if (userId) {
        return res.status(200).json({
            status: "Success",
            message: "LoggedIn user fetched successfully!",
            user: {
                fullName: user === null || user === void 0 ? void 0 : user.fullName,
                email: user === null || user === void 0 ? void 0 : user.email,
                role: user === null || user === void 0 ? void 0 : user.role,
            },
        });
    }
    else {
        return res.status(400).json({
            status: "Fail",
            message: "User not found!",
        });
    }
});
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user;
    const user = yield user_1.default.findOne({ _id: userId });
    if ((user === null || user === void 0 ? void 0 : user.role) !== "Admin") {
        return res.status(401).json({
            status: "Fail",
            message: "Unauthorized, only Admins can do this!"
        });
    }
    try {
        const users = yield user_1.default.find({});
        res.status(200).json({
            status: "Success",
            message: "Get all users is successful!",
            users: users
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'Fail',
            message: 'Something went wrong'
        });
    }
});
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user;
    const user = yield user_1.default.findOne({ _id: userId });
    if ((user === null || user === void 0 ? void 0 : user.role) !== "Admin") {
        return res.status(401).json({
            status: "Fail",
            message: "Unauthorized, only Admins can do this!"
        });
    }
    try {
        const id = req.params.id;
        const user = yield user_1.default.findById(id);
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: "Fail",
            message: "Something Went Wrong!"
        });
    }
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user;
    const user = yield user_1.default.findOne({ _id: userId });
    if ((user === null || user === void 0 ? void 0 : user.role) !== "Admin") {
        return res.status(401).json({
            status: "Fail",
            message: "Unauthorized, only Admins can do this!"
        });
    }
    try {
        const salt = yield bcryptjs_1.default.genSalt();
        const hashedPassword = yield bcryptjs_1.default.hash(req.body.password, salt);
        const hashedConfirmPassword = yield bcryptjs_1.default.hash(req.body.confirmPassword, salt);
        const user = yield user_1.default.findByIdAndUpdate(req.params.id, {
            fullName: req.body.fullName,
            email: req.body.email,
            password: hashedPassword,
            confirmPassword: hashedConfirmPassword
        }, { new: true });
        if (!user) {
            return res.status(404).json({
                status: "Fail",
                message: "User not found!",
            });
        }
        yield (user === null || user === void 0 ? void 0 : user.save());
        res.status(200).json({
            status: "Success",
            message: "user upadated sucessfully!",
            users: user
        });
    }
    catch (error) {
        res.status(500).json({
            status: "Fail",
            message: "Something Went Wrong!"
        });
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user;
    const user = yield user_1.default.findOne({ _id: userId });
    if ((user === null || user === void 0 ? void 0 : user.role) !== "Admin") {
        return res.status(401).json({
            status: "Fail",
            message: "Unauthorized, only Admins can do this!"
        });
    }
    try {
        const id = req.params.id;
        const user = yield user_1.default.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({
                status: "Fail",
                message: "User not found!",
            });
        }
        res.status(200).json({
            status: "Success",
            message: "User deleted successfully!"
        });
    }
    catch (error) {
        res.status(500).json({
            status: "Fail",
            message: "Something Went Wrong!"
        });
    }
});
exports.default = { createUser, logIn, loggedInUser, getAllUsers, getSingleUser, updateUser, deleteUser };
