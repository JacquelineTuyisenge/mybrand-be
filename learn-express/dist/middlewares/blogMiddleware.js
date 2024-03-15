"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { valid } = require('joi');
const blogs_1 = __importDefault(require("../validation/blogs"));
const isValid = (req, res, next) => {
    const { error } = (0, blogs_1.default)(req.body);
    console.log(error);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    // if no error, middleware gives permission to go to next, 
    try {
        next();
    }
    catch (error) {
        console.log('error', error);
    }
};
exports.default = isValid;
