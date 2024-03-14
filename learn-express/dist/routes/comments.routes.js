"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const comments_controllers_1 = __importDefault(require("../controllers/comments.controllers"));
const commentMiddleware_1 = __importDefault(require("../middlewares/commentMiddleware"));
const commentRouter = express_1.default.Router();
commentRouter.post("/:id/comments", commentMiddleware_1.default, comments_controllers_1.default.httpAddComment);
commentRouter.get("/:id/comments", comments_controllers_1.default.httpGetComments);
exports.default = commentRouter;
