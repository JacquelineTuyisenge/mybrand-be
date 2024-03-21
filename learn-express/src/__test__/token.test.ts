import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import { generateAccessToken, validateAccessToken } from "../security/accessToken";
dotenv.config();

describe("Token Functions", () => {
    const userId = "123456789";
    const role = "Admin";

    beforeAll(() => {
        // Set the JWT secret key
        process.env.ACCESS_TOKEN_KEY = "secret-key";
    });

    afterAll(() => {
        // Reset the JWT secret key
        process.env.ACCESS_TOKEN_KEY = "";
    });

    // Test generateAccessToken function with valid userId and role
    it("should generate a valid access token", () => {
        const token = generateAccessToken(userId, role);
    
        // Verify if the token is a non-empty string
        expect(token).toBeTruthy();
    
        // Verify if the token is a valid JWT token
        const decodedToken = jwt.decode(token) as jwt.JwtPayload;
        expect(decodedToken).toBeTruthy();
    
        // Verify if the decoded token contains the expected properties
        expect(decodedToken?.userId).toBe(userId);
        expect(decodedToken?.role).toBe(role);
    });


    // Test validateAccessToken function
    it("should validate a valid access token", () => {
        const token = generateAccessToken(userId, role);

        // Validate the token and expect it not to throw an error
        expect(() => validateAccessToken(token)).not.toThrow();
    });

    // Test validateAccessToken function with an invalid token
    it("should throw an error for an invalid access token", () => {
        const invalidToken = "invalid_token";

        // Validate an invalid token and expect it to throw an error
        expect(() => validateAccessToken(invalidToken)).toThrow("Invalid access token");
    });
});
