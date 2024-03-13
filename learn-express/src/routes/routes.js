const express = require("express");

const httpBlog = require('../controllers/blog.controllers')

const router = express.Router();

// get all blogs
router.get("/blogs", httpBlog.httpGetBlog);

 // create blog
router.post("/blogs", httpBlog.httpCreateBlog);

// get individual blog post
router.get("/blogs/:id", httpBlog.httpGetSingleBlog);

// Update the blog , single blog
router.patch("/blogs/:id", httpBlog.httpUpdateSingleBlog);

// delete blog post
router.delete("/blogs/:id", httpBlog.httpDeleteSingleBlog);

module.exports = router; // export the router