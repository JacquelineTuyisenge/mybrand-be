import express from "express";
import multer from "multer";
import httpBlog from '../controllers/blog.controllers';
import isValid from '../middlewares/blogMiddleware';
import authCheck from "../middlewares/authentication";


const blogRouter = express.Router(); // specific router for blog

const upload = multer({ dest: "./src/uploads" });


// get all blogs
blogRouter.get("/allblogs", httpBlog.httpGetBlog);

 // create blog, also here we used isValid
blogRouter.post("/", upload.single("image"), isValid, authCheck.isAdmin, httpBlog.httpCreateBlog);
// get individual blog post
blogRouter.get("/:id", httpBlog.httpGetSingleBlog);

// Update the blog , single blog
blogRouter.patch("/:id",authCheck.isAdmin, upload.single("image"), isValid,  httpBlog.httpUpdateSingleBlog);

// delete blog post
blogRouter.delete("/:id",authCheck.isAdmin ,httpBlog.httpDeleteSingleBlog);

export default blogRouter; // export the blogrouter