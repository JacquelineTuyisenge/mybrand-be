import request from "supertest";
import app from "../app";
import mongoose from "mongoose";
import mongoTest from "../services/mongoTest";
import Blog, { IBlog } from "../models/blog";
import User from "../models/user";
import Like from "../models/likes";

jest.setTimeout(20000);

let token: string;
let id: mongoose.Types.ObjectId;
// const blogId = '660217732d2593a26fe06496';
// const adminAuthToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDIxNmJlMmQyNTkzYTI2ZmUwNjQ5MyIsImZ1bGxOYW1lIjoiam9obiBkb2UiLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE3MTE0MTI5NzcsImV4cCI6MTcxMTQ5OTM3N30.Io7ziQg-ji7n6Nx458lak-BBf1BZ4ivG5C5SFjl5nqo';

describe ("Likes API", () => {
    beforeAll(async () => {
        await mongoTest.testConnect();
    });

    afterAll(async () => {
        await User.deleteMany({});
        await Blog.deleteMany({});
        await Like.deleteMany({});
        await mongoTest.testDisconnect();
    });

    it("should register and login a user", async () => {
        const register = await request(app)
            .post("/api/users/register")
            .send({
                fullName: "Test User",
                email: "admin@me.com",
                password: "password",
                confirmPassword: "password",
                role: "Admin"
            })
            .expect(201);


        const login = await request(app)
            .post("/api/users/login")
            .send({
                email: "admin@me.com",
                password: "password"
            })
            .expect(200);
        expect(login.body.token).toBeDefined();
        token = login.body.token;
    });

    it("should like a blog", async () => {
        const response = await request(app)
            .post(`/api/blogs/${id}/likes`)
            .set("Authorization", `Bearer ${token}`)
            .expect(201);

        expect(response.body.message).toBe("Blog liked successfully");
        expect(response.body).toHaveProperty('like');
    })

    //     // const newBlog = new Blog({
    //     //     title: "Test Blog",
    //     //     author: "Test Author",
    //     //     content: "Test Content"
    //     // });

    //     // const savedBlog = await newBlog.save();
    //     // blogId = savedBlog._id;

    //     const response = await request(app)
    //         .post(`/api/blogs/${blogId}/likes`)
    //         .set("Authorization", `Bearer ${adminAuthToken}`)
    //         .expect(201)

    //     expect(response.body.message).toBe("Blog liked successfully");
    //     expect(response.body).toHaveProperty('like');
    //     expect(response.body.like).toHaveProperty('_id');
    //     expect(response.body.like).toBeDefined();

    //     likeId = response.body.like._id;
    // });

    // it("should unlike a blog", async () => {
    //     const response = await request(app)
    //         .post(`/api/blogs/${blogId}/likes`)
    //         .set("Authorization", `Bearer ${adminAuthToken}`)
    //         .expect(200);

    //     expect(response.body.message).toBe("Blog unliked successfully");
    //     expect(response.body.like).toBeDefined();
    //     expect(response.body).toHaveProperty('message', 'Blog unliked successfully');
    // });
});