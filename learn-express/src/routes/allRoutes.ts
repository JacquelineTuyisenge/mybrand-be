// all routes: blog, comments, likes, querries
import express from "express";

import blogRouter from './blog.routes'

const apiRouter = express.Router();

apiRouter.use("/blogs", blogRouter) // all blog router should prioritize blogRouter

export default apiRouter;