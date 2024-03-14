"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const likesSchema = new Schema({
    blog_id: {
        type: Schema.Types.ObjectId,
        ref: "Blog",
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model("Like", likesSchema);
