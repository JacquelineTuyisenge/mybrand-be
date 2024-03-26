import request from "supertest";
import app from "../app";
import mongoose from "mongoose";
import mongoTest from "../services/mongoTest";
import Blog, { IBlog } from "../models/blog";
import User from "../models/user";
import Comment from "../models/comments";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

jest.setTimeout(20000);

let token: string;
let decoded: JwtPayload;

describe ("Comments API", () => {
    beforeAll(async () => {
        await mongoTest.testConnect();

        // generate a jwt token for authentication
        const user = new User({
            fullName: "Test User",
            email: "admin@me.com",
            password: "password",
            confirmPassword: "password",
            role: "Admin"
        });
        await user.save();

        token = jwt.sign({ id: user._id, fullName: user.fullName, role: user.role }, process.env.ACCESS_TOKEN_KEY || "thgvbdiuyfwgc"), { expiresIn: "1d" };

        decoded = jwt.verify(token, process.env.ACCESS_TOKEN_KEY || "thgvbdiuyfwgc") as jwt.JwtPayload;

        const userFullName = decoded.fullName;
        
    });

    afterAll(async () => {
        await User.deleteMany({});
        await Blog.deleteMany({});
        await Comment.deleteMany({});
        await mongoTest.testDisconnect();
    });

    
    it("should not add a comment to a blog if user is not logged in", async () => {
        // Create blog and get blog by id
        const blog = new Blog({
            title: "Test Blog",
            imageUrl: "Test Image URL",
            author: "Test Author",
            content: "Test Content"
        });
        await blog.save();
        const blogId = blog._id;

        const response = await request(app)
            .post(`/api/blogs/${blogId}/comments`)
            .send({
                comment: "Test Comment",
                author: "Anonymous"
            })
            .expect(403);

        expect(response.body.message).toEqual("access denied");
    });

    it("should add a comment to a blog", async () => {

        // create blog and get blog by id
        const blog = new Blog({
            title: "Test Blog",
            imageUrl: "Test Image URL",
            author: "Test Author",
            content: "Test Content"
        });

        await blog.save();
        const blogId = blog._id;


        const response = await request(app)
            .post(`/api/blogs/${blogId}/comments`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                comment: "Test Comment",
                author : decoded.userFullName
            })
            .expect(201);
        
        expect(response.status).toEqual(201);
        expect(response.body.status).toEqual("success");
        expect(response.body.comment.comment).toEqual("Test Comment");
        expect(response.body.author).toEqual(decoded.userFullName);
    });
});
