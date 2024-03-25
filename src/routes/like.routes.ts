import express from "express";
import httpLike from "../controllers/likes.controllers";
import authCheck from "../middlewares/authentication";

const likeRouter = express.Router();

likeRouter.post("/:id/likes",authCheck.authenticateLogin, httpLike.like);

export default likeRouter;