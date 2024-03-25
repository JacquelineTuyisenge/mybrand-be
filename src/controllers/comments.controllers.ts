import { Request, Response } from "express";
import Comment from "../models/comments";
import Blog, { IBlog } from "../models/blog";
import mongoose from "mongoose";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface CommentObject {
    author: string;
    comment: string;
}
// add comment
const httpAddComment = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;

        const token:any = req.headers.authorization?.split(" ")[1];
        const decoded: any = jwt.verify(token,   process.env.ACCESS_TOKEN_KEY || "thgvbdiuyfwgc" ) as JwtPayload;

        const commenter = decoded.fullName;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({ error: "Invalid blog ID" });
            return;
        }

        const blog: IBlog | null = await Blog.findById(id);

        if (!blog) {
            res.status(404).json({ error: "Blog not found" });
            return;
        }

        const newComment = new Comment({
            author: commenter,
            comment: req.body.comment,
            blog_id: id
        });

        const commentData = await newComment.save();

        blog.blogComments.push({
            author: commenter,
            comment: commentData.comment
        });
        // as CommentObject);

        await blog.save();

        res.status(201).json({
            status: "success",
            message: "Comment added successfully", 
            comment: commentData
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ 
            status: "error", 
            message: "something went wrong"
        });
    }
};

// get blog with comments

const httpGetComments = async (req: Request, res: Response): Promise<void> => {
    try {
        const blogId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(blogId)) {
            res.status(400).json({ 
                status: "error",
                message: "Invalid blog ID" });
            return;
        }

        const blog: IBlog | null = await Blog.findById(blogId);

        if (!blog) {
            res.status(404).json({ 
                status: "error",
                message: "Blog not found" });
            return;
        }

        res.status(200).json({
            status: "success",
            message: "Comments retrieved successfully",
            comments: blog.blogComments
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "Fail",
            message: "Something went wrong"
        });
    }
};      


// Delete all comments for a blog
// const httpDeleteCommentsForBlog = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const blogId = req.params.id;

//         if (!mongoose.Types.ObjectId.isValid(blogId)) {
//             res.status(400).json({ 
//                 status: "error",
//                 message: "Invalid blog ID" });
//             return;
//         }

//         // Find the blog
//         const blog: IBlog | null = await Blog.findById(blogId);

//         if (!blog) {
//             res.status(404).json({ error: "Blog not found" });
//             return;
//         }

//         // Delete all comments associated with the blog
//         await Comment.deleteMany({ blog_id: blogId });

//         res.status(200).json({
//             status: "success",
//             message: "All comments for the blog have been deleted"
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             status: "error",
//             message: "Something went wrong"
//         });
//     }
// };


export default { httpGetComments, httpAddComment, }; // httpDeleteCommentsForBlog