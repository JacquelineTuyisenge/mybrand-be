import express from "express";
import httpLike from "../controllers/likes.controllers";

const likeRouter = express.Router();

likeRouter.post("/:id/likes", httpLike.like);

export default likeRouter;