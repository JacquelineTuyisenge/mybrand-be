"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usersValidation_1 = __importDefault(require("../validation/usersValidation"));
const isValidUser = (req, res, next) => {
    const { error } = (0, usersValidation_1.default)(req.body);
    if (error) {
        return res.status(400).json({
            status: "Fail",
            message: error.details[0].message
        });
    }
    try {
        next();
    }
    catch (error) {
        console.error(error);
    }
};
exports.default = isValidUser;
