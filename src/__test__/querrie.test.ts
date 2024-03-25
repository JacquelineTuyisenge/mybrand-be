import request from "supertest";
 import app from "../app";
 import Querry from "../models/querries";
 import mongoTest from "../services/mongoTest";
 import mongoose from "mongoose";
 import jwt from "jsonwebtoken";

//  import {signUpData, loginData} from "../mock/static";

 jest.setTimeout(10000);

const secretKey = "cxtyhjniuytrdgvzjbcdsiottrdxcvbnm"; 

let id = mongoose.Types.ObjectId;

jest.setTimeout(20000);

let token: string;

describe("Querries API", () => {
    beforeAll(async () => {
        await mongoTest.testConnect();
    });

    afterAll(async () => {
        await Querry.deleteMany({});
        await mongoTest.testDisconnect();
    });

    describe("querries", () => {
        //querries

        it("should create new querry and return 201 with success message", async () => {

            const querryData = {
                name: "testName",
                email: "test@gmail.com",
                message: "test message"
            };

            const response = await request(app)
            .post("/api/querries")
            .send(querryData)
            .expect(201)
            .expect("Content-Type", /json/);

            expect(response.body.message).toStrictEqual("Querry created successfully");

            expect(response.body.querry).toBeDefined();
            expect(response.body.querry.name).toEqual(querryData.name);
            expect(response.body.querry.email).toEqual(querryData.email);
            expect(response.body.querry.message).toEqual(querryData.message);
            
        });

        it("should return all querries when admin user tries to get", async () => {
            const {body} = await request(app)
            .get("/api/querries")
            .expect(200)
            .expect("Content-Type", /json/);

            expect(body.message).toStrictEqual("Querries retrieved successfully");
        });

        it("should return 401 if non-admin user tries to access restricted endpoint", async () => {
            // Create a payload for a non-admin user
            const nonAdminPayload = {
                userId: "65fb698a966b871cdd2dfac1",
                role: "User" // Assuming "User" is a non-admin role
            };
    
            // Sign the JWT token using the secret key
            const nonAdminToken = jwt.sign(nonAdminPayload, secretKey);
    
            // Send a request to the restricted endpoint with the non-admin token
            const response = await request(app)
                .get("/api/querries")
                .set("Authorization", `Bearer ${nonAdminToken}`)
                .expect(401)
                .expect("Content-Type", /json/);
    
            // Assert that the response contains the expected error message
            expect(response.body.error).toBe("Unauthorized, only Admins can do this");
        });

        it("should handle errors and return 500 status code", async () => {
            // Mocking a scenario where an error occurs during saving the querry
            jest.spyOn(Querry.prototype, "save").mockRejectedValue(new Error("Test error"));

            const querryData = {
                name: "testName",
                email: "test@gmail.com",
                message: "test message"
            };

            const response = await request(app)
                .post("/api/querries")
                .send(querryData)
                .expect(500)
                .expect("Content-Type", /json/);

            expect(response.body.status).toEqual("error");
            expect(response.body.message).toEqual("Something went wrong");
        });
    })
})