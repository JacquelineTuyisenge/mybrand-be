"use strict";
// usersValidation
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const usersSchema = joi_1.default.object({
    fullName: joi_1.default.string().required().regex(/^[A-Za-z]+ [A-Za-z]+$/).messages({
        "string.empty": "Name field can't be empty!",
        "string.pattern.base": "Invalid full name format. Please provide a first name followed by a space and a last name."
    }),
    email: joi_1.default.string().required().email().messages({
        "string.empty": "Email field can't be empty!",
        "string.email": "Invalid email"
    }),
    password: joi_1.default.string().required().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,10}$/).messages({
        "string.empty": "Password field can't be empty!",
        "string.pattern.base": "Password must be between 6 and 10 characters long and contain at least one uppercase letter, one lowercase letter, and one digit"
    }),
    confirmPassword: joi_1.default.string().required().equal(joi_1.default.ref('password')).messages({
        "any.only": "Password don't match!"
    }),
    role: joi_1.default.string()
});
const validateUser = (data) => {
    return usersSchema.validate(data);
};
exports.default = validateUser;
