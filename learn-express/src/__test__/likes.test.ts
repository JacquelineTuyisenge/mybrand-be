import request from "supertest";
import app from "../app";
import mongoose from "mongoose";
import mongoTest from "../services/mongoTest";
import Blog, { IBlog } from "../models/blog";
import Like from "../models/likes";

jest.setTimeout(20000);

describe ("Likes API", () => {
    let blogId: string;
    let likeId: string;

    beforeAll(async () => {
        await mongoTest.testConnect();
    });

    afterAll(async () => {
        await Blog.deleteMany({});
        await Blog.deleteMany({});
        await Like.deleteMany({});
        await mongoTest.testDisconnect();
    });

    it("should add a like to a blog", async () => {
        const newBlog = new Blog({
            title: "Test Blog",
            author: "Test Author",
            content: "Test Content"
        });

        const savedBlog = await newBlog.save();
        blogId = savedBlog._id;

        const response = await request(app)
            .post(`/api/blogs/${blogId}/likes`)
            .expect(201)

        expect(response.body.status).toBe("success");
        expect(response.body.message).toBe("Blog liked successfully");
        expect(response.body.like).toBeDefined();

        likeId = response.body.like._id;
    });

    it("should unlike a blog", async () => {
        const response = await request(app)
            .post(`/api/blogs/${blogId}/likes`)
            .expect(200);

        expect(response.body.status).toBe("success");
        expect(response.body.message).toBe("Blog unliked successfully");
        expect(response.body.like).toBeDefined();
    });
});