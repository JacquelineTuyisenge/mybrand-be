"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// all routes: blog, comments, likes, querries
const express_1 = __importDefault(require("express"));
const blog_routes_1 = __importDefault(require("./blog.routes"));
const comments_routes_1 = __importDefault(require("./comments.routes"));
const like_routes_1 = __importDefault(require("./like.routes"));
const querries_routes_1 = __importDefault(require("./querries.routes"));
const apiRouter = express_1.default.Router();
apiRouter.use("/blogs", blog_routes_1.default); // all blog router should prioritize blogRouter
apiRouter.use("/blogs", comments_routes_1.default); // all comment router should prioritize commentRouter
apiRouter.use("/blogs", like_routes_1.default);
apiRouter.use("/querries", querries_routes_1.default);
exports.default = apiRouter;
