import express from "express";
import httpComment from '../controllers/comments.controllers';
import isValidComment from '../middlewares/commentMiddleware';
import authCheck from '../middlewares/authentication';

const commentRouter = express.Router();

commentRouter.post("/:id/comments/addcomment", authCheck.authLogin, isValidComment, httpComment.httpAddComment)
commentRouter.get("/:id/comments/allcomments", authCheck.authLogin, httpComment.httpGetComments )

export default commentRouter;