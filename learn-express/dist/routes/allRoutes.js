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
const user_routes_1 = __importDefault(require("./user.routes"));
const apiRouter = express_1.default.Router();
apiRouter.use("/blogs", blog_routes_1.default); // blog 
apiRouter.use("/blogs", comments_routes_1.default); // comments on blog
apiRouter.use("/blogs", like_routes_1.default); // likes on blog
apiRouter.use("/querries", querries_routes_1.default); // querries
apiRouter.use("/users", user_routes_1.default); //  users
exports.default = apiRouter;
