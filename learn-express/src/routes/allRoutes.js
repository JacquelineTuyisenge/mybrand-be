// all routes: blog, comments, likes, querries

const express = require("express");
const blogRouter = require('./blog.routes');

const apiRouter = express.Router();

apiRouter.use("/blogs", blogRouter) // all blog router should prioritize blogRouter
apiRouter.use("/comments", commentRouter) // all comment router should prioritize commentRouter

module.exports = apiRouter;