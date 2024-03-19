import express from "express";
import httpComment from '../controllers/comments.controllers';
import isValidComment from '../middlewares/commentMiddleware';

const commentRouter = express.Router();

commentRouter.post("/:id/comments", isValidComment, httpComment.httpAddComment)
commentRouter.get("/:id/comments", httpComment.httpGetComments )
// commentRouter.delete("/:id/comments", httpComment.httpDeleteCommentsForBlog)

export default commentRouter;