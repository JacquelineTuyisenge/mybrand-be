"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// all routes: blog, comments, likes, querries
const express_1 = __importDefault(require("express"));
const blog_routes_1 = __importDefault(require("./blog.routes"));
const apiRouter = express_1.default.Router();
apiRouter.use("/blogs", blog_routes_1.default); // all blog router should prioritize blogRouter
exports.default = apiRouter;
