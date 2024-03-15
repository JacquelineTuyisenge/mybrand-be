"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAccessToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const generateAccessToken = (user) => {
    const tokenKey = process.env.ACCESS_TOKEN_KEY;
    const token = jsonwebtoken_1.default.sign({ data: user }, tokenKey, {
        expiresIn: "30 min"
    });
    return token;
};
exports.generateAccessToken = generateAccessToken;
const validateAccessToken = (token) => {
    const tokenKey = process.env.ACCESS_TOKEN_KEY;
    return jsonwebtoken_1.default.verify(String(token), tokenKey);
};
exports.validateAccessToken = validateAccessToken;
