"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const querriesSchema = joi_1.default.object({
    name: joi_1.default.string().required().min(3).max(50).messages({
        "string.empty": "Name is required!",
        "string.min": "Name must be at least 3 characters long!",
        "string.max": "Name must be at most 50 characters long!",
    }),
    email: joi_1.default.string().required().email().messages({
        "string.empty": "Email is required!",
        "string.email": "Email must be a valid email address!"
    }),
    message: joi_1.default.string().required().min(5).messages({
        "string.empty": "Message is required!",
        "string.min": "Message must be at least 5 characters long!"
    })
});
const validateQuerry = (data) => {
    return querriesSchema.validate(data);
};
exports.default = validateQuerry;
