import request from "supertest";
import app from "../app";
import mongoose from "mongoose";
import mongoTest from "../services/mongoTest";
import Blog, { IBlog } from "../models/blog";
import User from "../models/user";
import Comment from "../models/comments";
import jwt, { JwtPayload } from "jsonwebtoken";
import cloudinary from "cloudinary";
import { secondBlogData } from "../mock/static";
import dotenv from "dotenv";
dotenv.config();

jest.setTimeout(20000);

let token: string;
let decoded: JwtPayload;

const adminAuthToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDMzMTJmNDIxZDY4MmU5NWZhNTZmYyIsImZ1bGxOYW1lIjoiamFja3kgZWx5bmVlIiwicm9sZSI6IkFkbWluIiwiaWF0IjoxNzExNDg1MjgxLCJleHAiOjE3MTE1NzE2ODF9.gLbOQWFgHZ4U9eT9V60zJrmpbrzZWzBva5EMeqTInqo";

jest.mock("cloudinary");
const filePath =
  "C:/Users/Nexus Tel 0785512718/OneDrive/Desktop/Jacky/jacky.jpg";

let id: mongoose.Types.ObjectId;

describe("Comments API", () => {
  beforeAll(async () => {
    await mongoTest.testConnect();

    // generate a jwt token for authentication
    const user = new User({
      fullName: "Test User",
      email: "admin@me.com",
      password: "password",
      confirmPassword: "password",
      role: "Admin",
    });
    await user.save();

    // token = jwt.sign({ id: user._id, fullName: user.fullName, role: user.role }, process.env.ACCESS_TOKEN_KEY || "thgvbdiuyfwgc"), { expiresIn: "1d" };

    // decoded = jwt.verify(token, process.env.ACCESS_TOKEN_KEY || "thgvbdiuyfwgc") as jwt.JwtPayload;

    // const userFullName = decoded.fullName;
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Blog.deleteMany({});
    await Comment.deleteMany({});
    await mongoTest.testDisconnect();
  });

//    //create blog
//    it("should create new blog", async () => {
//     const response = await request(app)
//       .post("/api/blogs")
//       .set("Authorization", `Bearer ${adminAuthToken}`)
//       .field("title", secondBlogData.title)
//       .field("author", secondBlogData.author)
//       .field("content", secondBlogData.content)
//       .attach("imageUrl", secondBlogData.imageUrl) 
//       .expect(201);

//     expect(response.body.message).toStrictEqual("Blog created successfully!");

//     expect(response.body.data).toBeDefined();
//     expect(response.body.data.title).toEqual(secondBlogData.title);
//     expect(response.body.data.author).toEqual(secondBlogData.author);
//     expect(response.body.data.content).toEqual(secondBlogData.content);
//     expect(response.body.data.imageUrl).toBeDefined();
//     console.log(response.body.data);
//   });

  it("should add and login a user", async () => {
    const mockUser = {
      fullName: "Test User",
      email: "test@example.com",
      password: "Pass123",
      confirmPassword: "Pass123",
      role: "User",
    };

    const response = await request(app)
      .post("/api/users/register")
      .send(mockUser)
      .expect(201);

    const responseLogin = await request(app)
      .post("/api/users/login")
      .send({
        email: mockUser.email,
        password: mockUser.password,
      })
      .expect(200);
    expect(responseLogin.body.token).toBeDefined();
    token = responseLogin.body.token;
  });

 

  // it("should not add a comment to a blog if user is not logged in", async () => {
  //     // Create blog and get blog by id
  //     // const blog = new Blog({
  //     //     title: "Test Blog",
  //     //     imageUrl: "Test Image URL",
  //     //     author: "Test Author",
  //     //     content: "Test Content"
  //     // });
  //     // await blog.save();
  //     // const blogId = blog._id;

  //     const response = await request(app)
  //         .post(`/api/blogs/${id}/comments`)
  //         .send({
  //             comment: "Test Comment"
  //         })
  //         .expect(401);

  //     expect(response.body.message).toEqual("UnAuthorized!");
  // });

  // it("should add a comment to a blog", async () => {

  //     // create blog and get blog by id
  //     // const blog = new Blog({
  //     //     title: "Test Blog",
  //     //     imageUrl: "Test Image URL",
  //     //     author: "Test Author",
  //     //     content: "Test Content"
  //     // });

  //     // await blog.save();
  //     // const blogId = blog._id;

  //     console.log(`here is the hgfdsdtyuklnbvcxsdfjkl,mnbvcxzasertyuil,mnbvcxzxdfghjklblog id: ${id}`);

  //     const response = await request(app)
  //         .post(`/api/blogs/${id}/comments`)
  //         .set('Authorization', `Bearer ${token}`)
  //         .send({
  //             comment: "Test Comment"
  //         })
  //         .expect(201);

  //     // expect(response.status).toEqual(201);
  //     expect(response.body.status).toStrictEqual("success");
  //     expect(response.body.comment.comment).toStrictEqual("Test Comment");
  // });
});
