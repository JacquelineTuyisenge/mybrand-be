import request from "supertest";
import app from "../app";
import mongoose from "mongoose";
import mongoTest from "../services/mongoTest";
import Blog, { IBlog } from "../models/blog";
import User from "../models/user";
import Like from "../models/likes";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

jest.setTimeout(20000);

let token: string;

// const blogId = '660217732d2593a26fe06496';
// const adminAuthToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDIxNmJlMmQyNTkzYTI2ZmUwNjQ5MyIsImZ1bGxOYW1lIjoiam9obiBkb2UiLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE3MTE0MTI5NzcsImV4cCI6MTcxMTQ5OTM3N30.Io7ziQg-ji7n6Nx458lak-BBf1BZ4ivG5C5SFjl5nqo';

describe ("Likes API", () => {
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

    });

    afterAll(async () => {
        await User.deleteMany({});
        await Blog.deleteMany({});
        await Like.deleteMany({});
        await mongoTest.testDisconnect();
    });

    it("should add a like to a blog", async () => {

        // create blog and get blog by id
        const blog = new Blog({
            title: "Test Blog",
            content: "This is a test blog",
            author: "author",
            imageUrl: "https://example.com/image.jpg",
        });

        await blog.save();

        const blogId = blog._id;

        const response = await request(app)
            .post(`/api/blogs/${blogId}/likes`)
            .set('Authorization', `Bearer ${token}`)
            .expect(201)

        expect(response.body.message).toStrictEqual("Blog liked successfully");
        expect(response.body.like).toBeDefined();
    })
});
