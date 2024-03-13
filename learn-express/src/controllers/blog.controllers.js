const Blog = require("../models/blog");

// create blog
const httpCreateBlog = async (req, res) => {
    const blog = new Blog({
      title: req.body.title,
      author: req.body.author,
      content: req.body.content
    });
  
    await blog.save();
    res.status(201).json({message: "Blog created successfully!", data: blog});
}

// get blog
const httpGetBlog = async (req, res) => {
    const blogs = await Blog.find(); // waiting till it finds the blogs
    res.status(200).json({message: "All blogs", data: blogs});
}

//get single blog
const httpGetSingleBlog = async (req, res) => {
    try {
      const blog = await Blog.findOne({ _id: req.params.id });
      res.send(blog);
    } catch {
      res.status(404);
      res.send({ error: "Post doesn't exist!" });
    }
}

//update single blog
const httpUpdateSingleBlog = async (req, res) => {
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
}

//delete single blog
const httpDeleteSingleBlog = async (req, res) => {
    try {
      await Blog.deleteOne({ _id: req.params.id });
      res.status(204).send();
    } catch {
      res.status(404);
      res.send({ error: "Blog doesn't exist!" });
    }
  }
// export
module.exports = {httpCreateBlog,httpGetBlog, httpGetSingleBlog, httpUpdateSingleBlog, httpDeleteSingleBlog};