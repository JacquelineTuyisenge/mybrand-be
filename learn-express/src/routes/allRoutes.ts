// all routes: blog, comments, likes, querries
import express from "express";

import blogRouter from './blog.routes';
import commentRouter from './comments.routes';

const apiRouter = express.Router();

apiRouter.use("/blogs", blogRouter); // all blog router should prioritize blogRouter
apiRouter.use("/blogs", commentRouter); // all comment router should prioritize commentRouter

export default apiRouter;