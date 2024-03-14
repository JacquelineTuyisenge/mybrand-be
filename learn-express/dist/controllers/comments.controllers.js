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
const comments_1 = __importDefault(require("../models/comments"));
const blog_1 = __importDefault(require("../models/blog"));
const mongoose_1 = __importDefault(require("mongoose"));
// add comment
const httpAddComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(400).json({ error: "Invalid blog ID" });
            return;
        }
        const blog = yield blog_1.default.findById(id);
        if (!blog) {
            res.status(404).json({ error: "Blog not found" });
            return;
        }
        const newComment = new comments_1.default({
            comment: req.body.comment,
            blog_id: id
        });
        const commentData = yield newComment.save();
        blog.blogComments.push(commentData.comment);
        yield blog.save();
        res.status(201).json({
            status: "success",
            message: "Comment added successfully",
            comment: commentData
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "something went wrong"
        });
    }
});
// get blog with comments
const httpGetComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogId = req.params.id;
        if (!mongoose_1.default.Types.ObjectId.isValid(blogId)) {
            res.status(400).json({
                status: "error",
                message: "Invalid blog ID"
            });
            return;
        }
        const blog = yield blog_1.default.findById(blogId);
        if (!blog) {
            res.status(404).json({
                status: "error",
                message: "Blog not found"
            });
            return;
        }
        res.status(200).json({
            status: "success",
            message: "Comments retrieved successfully",
            comments: blog.blogComments
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: "Fail",
            message: "Something went wrong"
        });
    }
});
exports.default = { httpGetComments, httpAddComment };
