const express = require("express");

const httpBlog = require('../controllers/blog.controllers')

const blogRouter = express.Router(); // specific router for blog

const isValid = require('../middlewares/blogMiddleware')

// get all blogs
blogRouter.get("/", httpBlog.httpGetBlog);

 // create blog, also here we used isValid, to check if everything is right and then it moves to next (httpBlog.httpCreateBlog), if not it throws error which is in middleware
blogRouter.post("/", isValid, httpBlog.httpCreateBlog);

// get individual blog post
blogRouter.get("/:id", httpBlog.httpGetSingleBlog);

// Update the blog , single blog
blogRouter.patch("/:id", httpBlog.httpUpdateSingleBlog);

// delete blog post
blogRouter.delete("/:id", httpBlog.httpDeleteSingleBlog);

module.exports = blogRouter; // export the blogrouter