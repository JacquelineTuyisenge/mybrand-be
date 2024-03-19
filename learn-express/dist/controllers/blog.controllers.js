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
const blog_1 = __importDefault(require("../models/blog"));
const user_1 = __importDefault(require("../models/user"));
// create blog
const httpCreateBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, author, content } = req.body;
    if (!title || !author || !content) {
        res.status(400).json({ error: "Missing required fields" });
        return;
    }
    try {
        const blog = new blog_1.default({
            title,
            author,
            content
        });
        yield blog.save();
        res.status(201).json({ message: "Blog created successfully!", data: blog });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
// get blog
const httpGetBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield blog_1.default.find();
        res.status(200).json({ message: "All blogs", data: blogs });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
//get single blog
const httpGetSingleBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogId = req.params.id;
        const blog = yield blog_1.default.findById(blogId);
        if (!blog) {
            res.status(404).json({ error: "Blog not found" });
            return;
        }
        res.status(200).json(blog);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
//update single blog
const httpUpdateSingleBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user;
    const user = yield user_1.default.findOne({ _id: userId });
    if ((user === null || user === void 0 ? void 0 : user.role) == "User") {
        res.status(401).json({ error: "Unauthorized, only Admins can update" });
        return;
    }
    try {
        const blogId = req.params.id;
        const update = {}; // Partial<IBlog> allows us to construct an object with possibly incomplete IBlog properties
        if (req.body.title) {
            update.title = req.body.title;
        }
        if (req.body.content) {
            update.content = req.body.content;
        }
        const updatedBlog = yield blog_1.default.findByIdAndUpdate(blogId, update, { new: true }); // { new: true } ensures that we get the updated document
        if (!updatedBlog) {
            res.status(404).json({ error: "Blog not found" });
            return;
        }
        res.status(200).json(updatedBlog);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
//delete single blog
const httpDeleteSingleBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user;
    const user = yield user_1.default.findOne({ _id: userId });
    if ((user === null || user === void 0 ? void 0 : user.role) !== "Admin") {
        res.status(401).json({ error: "Unauthorized, only Admins can delete" });
        return;
    }
    try {
        const blogId = req.params.id;
        const deletedBlog = yield blog_1.default.findByIdAndDelete(blogId);
        if (!deletedBlog) {
            res.status(404).json({ error: "Blog not found" });
            return;
        }
        res.status(204).send(); // No content to send for successful deletion
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
// export
exports.default = { httpCreateBlog, httpGetBlog, httpGetSingleBlog, httpUpdateSingleBlog, httpDeleteSingleBlog };
