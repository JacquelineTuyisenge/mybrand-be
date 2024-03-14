"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// validate the blogs schema(table / document in mongodb)
const joi_1 = __importDefault(require("joi"));
const BlogSchema = joi_1.default.object({
    title: joi_1.default.string().required().messages({
        "string.empty": "Title of Blog is required!"
    }),
    author: joi_1.default.string().required().messages({
        "string.empty": "Blog's Author is required!"
    }),
    content: joi_1.default.string().required().messages({
        "string.empty": "Blog content can't be empty!"
    })
});
const validateBlog = (blogData) => {
    return BlogSchema.validate(blogData);
};
exports.default = validateBlog;
