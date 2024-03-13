const express = require("express");
const Blog = require("../models/blog");
const router = express.Router();

// get all blogs
router.get("/blogs", async (req, res) => {
  const blogs = await Blog.find(); // waiting till it finds the blogs
  res.status(200).json({message: "All blogs", data: blogs});
});
 // creating blog
router.post("/blogs", async (req, res) => {
  const blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    content: req.body.content
  });

  await blog.save();
  res.status(201).json({message: "Blog created successfully!", data: blog});
});

// get individual blog post
router.get("/blogs/:id", async (req, res) => {
  try {
    const blog = await Blog.findOne({ _id: req.params.id });
    res.send(blog);
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
});

// Update the blog , single blog
router.patch("/blogs/:id", async (req, res) => {
  try {
    const blog = await  Blog.findOne({ _id: req.params.id });

    if (req.body.title) {
      blog.title = req.body.title;
    }

    if (req.body.content) {
      blog.content = req.body.content;
    }

    await blog.save();
    res.send(blog);
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
});

// delete blog post
router.delete("/blogs/:id", async (req, res) => {
  try {
    await Blog.deleteOne({ _id: req.params.id });
    res.status(204).send();
  } catch {
    res.status(404);
    res.send({ error: "Blog doesn't exist!" });
  }
});

module.exports = router; // export the our router