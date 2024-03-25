import request from "supertest";
import app from "../app";
import mongoose from "mongoose";
import mongoTest from "../services/mongoTest";
import Blog, { IBlog } from "../models/blog";

jest.setTimeout(20000);

describe ("Comments API", () => {
    beforeAll(async () => {
        await mongoTest.testConnect();
    });

    afterAll(async () => {
        await Blog.deleteMany({});
        await mongoTest.testDisconnect();
    });

    it("should add a comment to a blog", async () => {
        const newBlog = new Blog({
            title: "Test Blog",
            author: "Test Author",
            content: "Test Content"
        });

        await newBlog.save();

        const CommentData = {
            author: "Comment Author",
            comment: "Test Comment"
        };

        const response = await request(app)
            .post(`/api/blogs/${newBlog._id}/comments`)
            .send(CommentData)
            .expect(201)
            .expect("Content-Type", /json/);

            expect(response.body.status).toEqual("success");
            expect(response.body.message).toEqual("Comment added successfully");
            expect(response.body.comment).toBeDefined();
            expect(response.body.comment.author).toEqual(CommentData.author);
            expect(response.body.comment.comment).toEqual(CommentData.comment);
    });

    it("should return 400 if for invalid blog id", async () => {
        const commentData = {
            author: "Comment Author",
            comment: "Test Comment"
        };

        await request(app)
            .post(`/api/blogs/123/comments`) // Non-existing blog ID
            .send(commentData)
            .expect(400)
            .expect("Content-Type", /json/)
            .expect({error: "Invalid blog ID"});
    });

    it("should return 400 if comment data is invalid", async () => {
        const commentData = {
            author: "", // Invalid author
            comment: "" // Invalid comment
        };

        await request(app)
            .post(`/api/blogs/123/comments`)
            .send(commentData)
            .expect(400)
            .expect("Content-Type", /json/)
            .expect({ message: "Comment's Author is required!" });
    });

    it("should return comments for a valid blog ID", async () => {
        const newBlog = new Blog({
            title: "Test Blog",
            author: "Test Author",
            content: "Test Content",
            blogComments: [
                { author: "Comment Author 1", comment: "Comment 1" },
                { author: "Comment Author 2", comment: "Comment 2" }
            ]
        });
        await newBlog.save();

        const response = await request(app)
            .get(`/api/blogs/${newBlog._id}/comments`)
            .expect(200)
            .expect("Content-Type", /json/);

        expect(response.body.status).toEqual("success");
        expect(response.body.message).toEqual("Comments retrieved successfully");
        expect(response.body.comments).toHaveLength(2);
    });

    it("should return 400 if blog ID is invalid", async () => {
        await request(app)
            .get(`/api/blogs/invalidID/comments`)
            .expect(400)
            .expect("Content-Type", /json/)
            .expect({ status: "error", message: "Invalid blog ID" });
    });

    it("should handle errors when adding a comment", async () => {
        // Mock an error in the Blog.findById function
        jest.spyOn(Blog, "findById").mockImplementation(() => {
            throw new Error("Test error");
        });

        const newBlog = new Blog({
            title: "Test Blog",
            author: "Test Author",
            content: "Test Content"
        });

        await newBlog.save();

        const commentData = {
            author: "Comment Author",
            comment: "Test Comment"
        };

        await request(app)
            .post(`/api/blogs/${newBlog._id}/comments`)
            .send(commentData)
            .expect(500)
            .expect("Content-Type", /json/)
            .expect({ status: "error", message: "something went wrong" });
    });

});