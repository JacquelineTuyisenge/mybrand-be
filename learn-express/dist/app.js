"use strict";
// contains our middleware/ server
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // creating a server
const allRoutes_1 = __importDefault(require("./routes/allRoutes"));
const app = (0, express_1.default)(); // app variable to configure our server 
app.use(express_1.default.json()); // middleware
app.use("/api", allRoutes_1.default);
exports.default = app;
