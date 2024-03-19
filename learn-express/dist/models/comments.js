"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const commentsSchema = new Schema({
    author: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    blog_id: {
        type: Schema.Types.ObjectId,
        ref: "Blog",
        required: true
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model("Comment", commentsSchema);
