import request from "supertest";
import app from "../app";
import Querry from "../models/querries";
import User from "../models/user";
import mongoTest from "../services/mongoTest";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

jest.setTimeout(20000);

let token: string;

describe("Querries API", () => {
  beforeAll(async () => {
    await mongoTest.testConnect();

    // create admin user and generate a jwt token
    const adminUser = new User({
        fullName: "Admin User",
        email: "admin@example.com",
        password: "Admin123",
        confirmPassword: "Admin123",
        role: "Admin",
    });
    await adminUser.save();

    token = jwt.sign({ id: adminUser._id, fullName: adminUser.fullName, role: adminUser.role }, process.env.ACCESS_TOKEN_KEY || "thgvbdiuyfwgc"), { expiresIn: "1d" };
  });

  afterAll(async () => {
    await Querry.deleteMany({});
    await User.deleteMany({});
    await mongoTest.testDisconnect();
  });

  describe("POST /querries", () => {
    it("should add a querry", async () => {
      const mockQuerry = {
        name: "John Doe",
        email: "john@example.com",
        message: "This is a test querry",
      };

      const response = await request(app)
        .post("/api/querries")
        .send(mockQuerry)
        .expect(201)
        .expect("Content-Type", /json/);

      expect(response.body.status).toBe("success");
      expect(response.body.message).toBe("Querry created successfully");
      expect(response.body.querry.name).toBe(mockQuerry.name);
      expect(response.body.querry.email).toBe(mockQuerry.email);
      expect(response.body.querry.message).toBe(mockQuerry.message);
    });

    // it("should get all querries", async () => {
    //   // Create mock querries
    //   const mockQuerries = 
    //     {
    //       name: "John Doe",
    //       email: "john@example.com",
    //       message: "This is a test querry",
    //     };
    //     // {
    //     //   name: "Jane Doe",
    //     //   email: "jane@example.com",
    //     //   message: "This is another test querry",
    //     // },
      

    //   // Insert mock querries into the database
    //   await Querry.insertMany(mockQuerries);

    //   // Send request to get all querries
    //   const response = await request(app)
    //     .get("/api/querries")
    //     .set("Authorization", `Bearer ${token}`)
    //     .expect(200)
    //     .expect("Content-Type", /json/);

    //   // Check if response contains the expected querries
    //   expect(response.body.status).toBe("success");
    //   expect(response.body.message).toBe("Querries retrieved successfully");

    //   // Check if each querry in the response matches the mock querries
    //   response.body.querries.forEach((querry: any, index: number) => {
    //     expect(querry.name).toBe(mockQuerries.name);
    //     expect(querry.email).toBe(mockQuerries.email);
    //     expect(querry.message).toBe(mockQuerries.message);
    //   });
    // });

  });

});





// import request from "supertest";
//  import app from "../app";
//  import Querry from "../models/querries";
//  import mongoTest from "../services/mongoTest";
//  import mongoose from "mongoose";
//  import jwt from "jsonwebtoken";

// //  import {signUpData, loginData} from "../mock/static";

//  jest.setTimeout(10000);

// const secretKey = "cxtyhjniuytrdgvzjbcdsiottrdxcvbnm"; 

// let id = mongoose.Types.ObjectId;

// jest.setTimeout(20000);

// let token: string;

// describe("Querries API", () => {
//     beforeAll(async () => {
//         await mongoTest.testConnect();
//     });

//     afterAll(async () => {
//         await Querry.deleteMany({});
//         await mongoTest.testDisconnect();
//     });

//     describe("querries", () => {
//         //querries

//         it("should create new querry and return 201 with success message", async () => {

//             const querryData = {
//                 name: "testName",
//                 email: "test@gmail.com",
//                 message: "test message"
//             };

//             const response = await request(app)
//             .post("/api/querries")
//             .send(querryData)
//             .expect(201)
//             .expect("Content-Type", /json/);

//             expect(response.body.message).toStrictEqual("Querry created successfully");

//             expect(response.body.querry).toBeDefined();
//             expect(response.body.querry.name).toEqual(querryData.name);
//             expect(response.body.querry.email).toEqual(querryData.email);
//             expect(response.body.querry.message).toEqual(querryData.message);
            
//         });

//         it("should return all querries when admin user tries to get", async () => {
//             const {body} = await request(app)
//             .get("/api/querries")
//             .expect(200)
//             .expect("Content-Type", /json/);

//             expect(body.message).toStrictEqual("Querries retrieved successfully");
//         });

//         it("should return 401 if non-admin user tries to access restricted endpoint", async () => {
//             // Create a payload for a non-admin user
//             const nonAdminPayload = {
//                 userId: "65fb698a966b871cdd2dfac1",
//                 role: "User" // Assuming "User" is a non-admin role
//             };
    
//             // Sign the JWT token using the secret key
//             const nonAdminToken = jwt.sign(nonAdminPayload, secretKey);
    
//             // Send a request to the restricted endpoint with the non-admin token
//             const response = await request(app)
//                 .get("/api/querries")
//                 .set("Authorization", `Bearer ${nonAdminToken}`)
//                 .expect(401)
//                 .expect("Content-Type", /json/);
    
//             // Assert that the response contains the expected error message
//             expect(response.body.error).toBe("Unauthorized, only Admins can do this");
//         });

//         it("should handle errors and return 500 status code", async () => {
//             // Mocking a scenario where an error occurs during saving the querry
//             jest.spyOn(Querry.prototype, "save").mockRejectedValue(new Error("Test error"));

//             const querryData = {
//                 name: "testName",
//                 email: "test@gmail.com",
//                 message: "test message"
//             };

//             const response = await request(app)
//                 .post("/api/querries")
//                 .send(querryData)
//                 .expect(500)
//                 .expect("Content-Type", /json/);

//             expect(response.body.message).toEqual("Something went wrong");
//         });
//     })
// })