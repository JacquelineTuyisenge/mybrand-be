import request  from "supertest";
import app from "../app";   
import exp from "constants";
import Blog, { IBlog } from "../models/blog";
import User from "../models/user";
import mongoTest from "../services/mongoTest";
import mongoose from "mongoose";
import cloudinary from "cloudinary";
import jwt from "jsonwebtoken";


jest.mock("cloudinary");
const filePath = "C:/Users/Nexus Tel 0785512718/OneDrive/Desktop/Jacky/jacky.jpg";

console.log = jest.fn();


const secretKey = "cxtyhjniuytrdgvzjbcdsiottrdxcvbnm"; 

let userId = mongoose.Types.ObjectId;

let nonAdminAuthToken: string;

const adminAuthToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDFkYTNmYmI0YjYyZTAyNmVjN2M5OCIsImZ1bGxOYW1lIjoiQWxveXNpZSBBbG95c2lvdXMiLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE3MTEzOTc0NzksImV4cCI6MTcxMTQ4Mzg3OX0.2RCNnkoYkh9rlICH_E25bWlQLj1H3rJ7W4Z2BVC5LW4";

jest.setTimeout(30000);

let token: string;
let blogId: string;


describe("Blog API", () => {
    beforeAll(async () => {
        // const nonAdminUser = new User({
        //     fullName: "non admin",
        //     email: "nonadmin@me.com",
        //     password: "password",
        //     confirmPassword: "password",
        //     role: "User"
        // });
        // await nonAdminUser.save();
        // nonAdminAuthToken = jwt.sign({ id: nonAdminUser._id, fullName: nonAdminUser.fullName, role: nonAdminUser.role }, secretKey);
        await mongoTest.testConnect();
    });

    afterAll(async () => {
        await Blog.deleteMany({});
        await User.deleteMany({});
        await mongoTest.testDisconnect();
    });

   describe("welcome API message", () => {

        it("should return 200 and welcome message", async () => {
            const {body} = await request(app)
            .get("/api")
            .expect(200)
            .expect("Content-Type", /json/);

            expect(body.message).toStrictEqual("Welcome to the Blog API");
        });

        //create blog
        it("should create new blog", async () => {

            const mockCloudinaryResponse = {
                secure_url: "https://mocked-cloudinary-url/image.jpg"
            };
            (cloudinary.v2.uploader.upload as jest.Mock).mockResolvedValue(mockCloudinaryResponse);

            const blogData = {
                title: "ATLP Journey",
                author: "Jacqueline",
                content: "blog content"
            };

            const response = await request(app)
            .post("/api/blogs")
            .set("Authorization", `Bearer ${adminAuthToken}`)
            .field("title", blogData.title)
            .field("author", blogData.author)
            .field("content", blogData.content)
            .attach("image", filePath) // Attach the image file
            .expect(201)
            .expect("Content-Type", /json/);

            expect(response.body.message).toStrictEqual("Blog created successfully!");

            expect(response.body.data).toBeDefined();
            expect(response.body.data.title).toEqual(blogData.title);
            expect(response.body.data.author).toEqual(blogData.author);
            expect(response.body.data.content).toEqual(blogData.content);
            expect(response.body.data.imageUrl).toEqual(mockCloudinaryResponse.secure_url);
        });

        it("should return all blogs and 200", async () => {
            const {body} = await request(app)
            .get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /json/);

            expect(body.message).toStrictEqual("All blogs");
            expect(body.data).toBeDefined();
        });

        it("should return a single blog by ID", async () => {

            const testBlog: IBlog = new Blog({
                title: "Test Blog",
                author: "Test Author",
                content: "Test Content",
              });
              await testBlog.save();
              blogId = testBlog._id;

            const response = await request(app)
              .get(`/api/blogs/${blogId}`)
              .expect(200)
              .expect("Content-Type", /json/);
      
            expect(response.body).toMatchObject({
              title: "Test Blog",
              author: "Test Author",
              content: "Test Content",
            });
          });

        it("should return error when blog is not found", async () => {
            const blogId = "65f25fce082bab110f67bd99";
            const {body} = await request(app)
            .get("/api/blogs/65f25fce082bab110f67bd99")
            .expect(404)
            .expect("Content-Type", /json/);

            expect(body.error).toEqual("Blog not found");
        });

        it("should update an existing blog with valid data", async () => {
            const createdBlog = new Blog({
                title: "Updated Title",
                author: "Updated Author",
                content: "Updated Content",
                imageUrl: "https://example.com/image.jpg",
            });
            await createdBlog.save();
            const blogId = createdBlog._id;

            const updatedData = {
                title: "Updated Title",
                author: "Updated Author",
                content: "Updated Content",
                imageUrl: "https://example.com/image.jpg",
            };

            const { body } = await request(app)
                .patch(`/api/blogs/${createdBlog._id}`)
                .set("Authorization", `Bearer ${adminAuthToken}`)
                .send(updatedData)
                .expect(200)
                .expect("Content-Type", /json/);
            
            expect(body).toMatchObject(updatedData);
            expect(body.title).toEqual(updatedData.title);
            expect(body.author).toEqual(updatedData.author);
            expect(body.content).toEqual(updatedData.content);
        });

        it("should return 401 if user is not authenticated", async () => {
            await request(app)
                .delete(`/api/blogs/${blogId}`)
                .expect(403)
                .expect("Content-Type", /json/);
        });

        it("should return 500 on server error", async () => {
            const {body} = await request(app)
            .get("/api/blogs/123")
            .expect(500)
            .expect("Content-Type", /json/);
        });

        it("should return 401 when non-admin user tries to update blogs", async () => {
            const {body} = await request(app)
            .patch("/api/blogs/65f26043082bab110f67bd9e")
            .send({
                title: "test title",
                author: "test author",
                content: "test content"
            })
            .expect(403)
            .expect("Content-Type", /json/);
        });

        it("should return 401 when non-admin user tries to delete blogs", async () => {
            const {body} = await request(app)
            .delete("/api/blogs/65f26043082bab110f67bd9e")
            .expect(403)
            .expect("Content-Type", /json/);
        })
   })
});