import express from "express";
import httpLike from "../controllers/likes.controllers";
import authcheck from "../middlewares/authentication";

const likeRouter = express.Router();

likeRouter.post("/:id/likes", authcheck.authLogin, httpLike.like);

export default likeRouter;