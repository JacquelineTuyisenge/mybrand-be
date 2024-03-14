"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const querriesValidation_1 = __importDefault(require("../validation/querriesValidation"));
const isValidQuerry = (req, res, next) => {
    const { error } = (0, querriesValidation_1.default)(req.body);
    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        });
    }
    try {
        next();
    }
    catch (error) {
        console.error('error', error);
    }
};
exports.default = isValidQuerry;
