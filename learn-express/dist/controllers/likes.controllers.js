"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const likes_1 = __importDefault(require("../models/likes"));
const mongoose_1 = __importDefault(require("mongoose"));
const blog_1 = __importDefault(require("../models/blog"));
const like = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogId = req.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(blogId)) {
        return res.status(400).json({
            status: "error",
            message: "Invalid blog ID"
        });
    }
    try {
        // Find the blog post
        const blog = yield blog_1.default.findById(blogId);
        if (!blog) {
            return res.status(404).json({
                status: "error",
                message: "Blog not found"
            });
        }
        // Check if the user has already liked the post
        let blogLike = yield likes_1.default.findOne({ blog_id: blogId });
        if (!blogLike) {
            // If the user hasn't liked the post, create a new like
            const newLike = new likes_1.default({
                blog_id: blogId
            });
            const savedLike = yield newLike.save();
            // Update the blog's likes count and save
            blog.blogLikes.push(savedLike._id);
            yield blog.save();
            return res.status(201).json({
                status: "success",
                message: "Blog liked successfully",
                like: savedLike
            });
        }
        else {
            // If the user has already liked the post, unlike it
            yield likes_1.default.deleteOne({ _id: blogLike._id });
            blog.blogLikes = blog.blogLikes.filter(id => !id.equals(blogLike === null || blogLike === void 0 ? void 0 : blogLike._id));
            yield blog.save();
            return res.status(200).json({
                status: "success",
                message: "Blog unliked successfully",
                like: blogLike
            });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "error",
            message: "Something went wrong"
        });
    }
});
exports.default = { like };
