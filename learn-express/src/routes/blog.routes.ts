import express from "express";

import httpBlog from '../controllers/blog.controllers';

import isValid from '../middlewares/blogMiddleware';

import authenticateLogin from "../middlewares/authentication";

const blogRouter = express.Router(); // specific router for blog

// get all blogs
blogRouter.get("/", httpBlog.httpGetBlog);

 // create blog, also here we used isValid
blogRouter.post("/", isValid, httpBlog.httpCreateBlog);

// get individual blog post
blogRouter.get("/:id", httpBlog.httpGetSingleBlog);

// Update the blog , single blog
blogRouter.patch("/:id",authenticateLogin ,  httpBlog.httpUpdateSingleBlog);

// delete blog post
blogRouter.delete("/:id",authenticateLogin ,httpBlog.httpDeleteSingleBlog);

export default blogRouter; // export the blogrouter