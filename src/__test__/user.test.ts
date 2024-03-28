 import request from "supertest";
 import app from "../app";
 import User from "../models/user";
 import mongoTest from "../services/mongoTest";
 import mongoose from "mongoose";
 import jwt from "jsonwebtoken";
 import bcrypt from "bcryptjs";
 import dotenv from "dotenv";

 dotenv.config();



//  import {signUpData, loginData} from "../mock/static";

 jest.setTimeout(10000);

 let token: string;

 const id = mongoose.Types.ObjectId;

 describe("User API", () => {
     beforeAll(async () => {
         await mongoTest.testConnect();
     });

     afterAll(async () => {
         await User.deleteMany({});
         await mongoTest.testDisconnect();
     });


     describe("POST /register, login and GET users", () => {
        const mockUser = {
            fullName: "Test User",
            email: "test@example.com",
            password: "Pass123",
            confirmPassword: "Pass123",
            role: "User"
        };
    
        it("should register a user", async () => {
            const response = await request(app)
                .post("/api/users/register")
                .send(mockUser)
                .expect(201)
                .expect("Content-Type", /json/);
    
            console.log(response.body); // Add this line for inspection
            // expect(response.body.body).toHaveProperty('email');
            // expect(response.body.email).toBe(mockUser.email);
            expect(response.body.message).toBe("User created successfully!");
        });


        //get users
        it("should return 401 when non-admin user tries to get all users", async () => {
            const {body} = await request(app)
            .get("/api/users")
            .expect(403)
            .expect("Content-Type", /json/);
        });

      

        it("should return 409 if user already exists", async () => {
            // Create a user in the database with the same email as the one in the request body
            await User.create({ 
                fullName: "Test User", 
                email: "test@example.com", 
                password: "Pass123",
                confirmPassword: "Pass123",
                role: "User"});
    
            // Send a request to create a user with the same email
            const response = await request(app)
                .post("/api/users/register")
                .send({ 
                    fullName: "Another TestUser", 
                    email: "test@example.com", 
                    password: "Pass456",
                    confirmPassword: "Pass456",
                    role: "User"})
                .expect(409)
                .expect("Content-Type", /json/);
    
            // Assert that the response contains the expected error message
            expect(response.body).toStrictEqual({
                status: 409,
                message: "Email test@example.com already exists!"
            });
        });

        // it("should return 201, create user and login", async () => {

        //     const signUpData = {
        //         fullName: "jacky",
        //         email: "jackie2002@gmail",
        //         password: "Jacki123",
        //         confirmPassword: "Jacki123",
        //         role: "Admin"
        //     };

        //     const response = await request(app)
        //     .post("/api/users/register")
        //     .send(signUpData)
        //     .expect(201)
        //     .expect("Content-Type", /json/);

        //     const loginData = {
        //         fullName: "jacky",
        //         email: "jackie2002@gmail"
        //     };

        //     const responseLogin = await request(app)
        //     .post("api/users/login")
        //     .send(loginData)
        //     .expect(200)

        //     token = responseLogin.body.token;
        // });
            
     })
});
    