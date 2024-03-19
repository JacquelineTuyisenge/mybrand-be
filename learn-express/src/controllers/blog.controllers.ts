import { Request, Response } from "express";
import Blog, { IBlog } from "../models/blog";
import User from "../models/user";

interface AuthenticatedRequest<T = Record<string, any>> extends Request<T> {
    user?: any;
  }


// create blog
const httpCreateBlog = async (req: Request, res: Response): Promise<void> => {
    const { title, author, content } = req.body;
    if (!title || !author || !content) {
        res.status(400).json({ error: "Missing required fields" });
        return;
    }

    try {
        const blog: IBlog = new Blog({
            title,
            author,
            content
        });
    
        await blog.save();
        res.status(201).json({ message: "Blog created successfully!", data: blog });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

// get blog
const httpGetBlog = async (req: Request, res: Response): Promise<void> => {
    try {
        const blogs: IBlog[] = await Blog.find();
        res.status(200).json({ message: "All blogs", data: blogs });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

//get single blog
const httpGetSingleBlog = async (req: Request, res: Response): Promise<void> => {
    try {
        const blogId = req.params.id;
        const blog: IBlog | null = await Blog.findById(blogId);
        if (!blog) {
            res.status(404).json({ error: "Blog not found" });
            return;
        }
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

//update single blog
const httpUpdateSingleBlog = async (req: AuthenticatedRequest, res: Response): Promise<void> => {

    const userId = req.user;
    const user = await User.findOne({ _id: userId});

    if (user?.role == "User") {
        res.status(401).json({ error: "Unauthorized, only Admins can update" });
        return;
    }

    try {
        const blogId = req.params.id;
        const update: Partial<IBlog> = {}; // Partial<IBlog> allows us to construct an object with possibly incomplete IBlog properties
        if (req.body.title) {
            update.title = req.body.title;
        }
        if (req.body.content) {
            update.content = req.body.content;
        }
        const updatedBlog = await Blog.findByIdAndUpdate(blogId, update, { new: true }); // { new: true } ensures that we get the updated document
        if (!updatedBlog) {
            res.status(404).json({ error: "Blog not found" });
            return;
        }
        res.status(200).json(updatedBlog);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

//delete single blog
const httpDeleteSingleBlog = async (req: AuthenticatedRequest, res: Response): Promise<void> => {

    const userId = req.user;
    const user = await User.findOne({ _id: userId});

    if (user?.role !== "Admin") {
        res.status(401).json({ error: "Unauthorized, only Admins can delete" });
        return;
    }

    try {
        const blogId = req.params.id;
        const deletedBlog = await Blog.findByIdAndDelete(blogId);
        if (!deletedBlog) {
            res.status(404).json({ error: "Blog not found" });
            return;
        }
        res.status(204).send(); // No content to send for successful deletion
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

// export
export default { httpCreateBlog, httpGetBlog, httpGetSingleBlog, httpUpdateSingleBlog, httpDeleteSingleBlog };
