"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const likes_controllers_1 = __importDefault(require("../controllers/likes.controllers"));
const likeRouter = express_1.default.Router();
likeRouter.post("/:id/likes", likes_controllers_1.default.like);
exports.default = likeRouter;
