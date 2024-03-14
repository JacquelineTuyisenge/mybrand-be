"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const commentSchema = joi_1.default.object({
    comment: joi_1.default.string().required().messages({
        "string.empty": "Comment can't be empty!"
    })
});
const validateComment = (comment) => {
    return commentSchema.validate(comment);
};
exports.default = validateComment;
