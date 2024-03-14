"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { valid } = require('joi');
const commentsValidation_1 = __importDefault(require("../validation/commentsValidation"));
const isValidComment = (req, res, next) => {
    const { error } = (0, commentsValidation_1.default)(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message
        });
    }
    try {
        next();
    }
    catch (error) {
        console.error(error);
    }
};
exports.default = isValidComment;
