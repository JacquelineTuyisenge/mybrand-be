import { Request, Response } from "express";
import Like from "../models/likes";
import mongoose from "mongoose";
import Blog, { IBlog } from "../models/blog";
import jwt, { JwtPayload } from "jsonwebtoken";

const like = async (req: Request, res: Response) => {

    const blogId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(blogId)) {
        return res.status(400).json({
            status: "error",
            message: "Invalid blog ID"
        });
    }

    try {
        // Find the blog post
        const blog: IBlog | null = await Blog.findById(blogId);

        if (!blog) {
            return res.status(404).json({
                status: "error",
                message: "Blog not found"
            });
        }

        // Check if the user has already liked the post
        let blogLike = await Like.findOne({ blog_id: blogId });

        if (!blogLike) {
            // If the user hasn't liked the post, create a new like
            const newLike = new Like({
                blog_id: blogId
            });

            const savedLike = await newLike.save();

            // Update the blog's likes count and save
            blog.blogLikes.push(savedLike._id);
            await blog.save();

            return res.status(201).json({
                status: "success",
                message: "Blog liked successfully",
                like: savedLike
            });
        } else {
            // If the user has already liked the post, unlike it
            await Like.deleteOne({ _id: blogLike._id });

            blog.blogLikes = blog.blogLikes.filter(id => !id.equals(blogLike?._id));
            await blog.save();

            return res.status(200).json({
                status: 200,
                message: "Blog unliked successfully",
                like: blogLike
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "error",
            message: "Something went wrong"
        });
    }
};

export default { like };
