"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blog_controllers_1 = __importDefault(require("../controllers/blog.controllers"));
const blogMiddleware_1 = __importDefault(require("../middlewares/blogMiddleware"));
const blogRouter = express_1.default.Router(); // specific router for blog
// get all blogs
blogRouter.get("/", blog_controllers_1.default.httpGetBlog);
// create blog, also here we used isValid
blogRouter.post("/", blogMiddleware_1.default, blog_controllers_1.default.httpCreateBlog);
// get individual blog post
blogRouter.get("/:id", blog_controllers_1.default.httpGetSingleBlog);
// Update the blog , single blog
blogRouter.patch("/:id", blog_controllers_1.default.httpUpdateSingleBlog);
// delete blog post
blogRouter.delete("/:id", blog_controllers_1.default.httpDeleteSingleBlog);
exports.default = blogRouter; // export the blogrouter
