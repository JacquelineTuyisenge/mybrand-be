// all routes: blog, comments, likes, querries
import express from "express";
import blogRouter from './blog.routes';
import commentRouter from './comments.routes';
import likeRouter from './like.routes';
import querriesRouter from './querries.routes';
import UserRouter from './user.routes'

const apiRouter = express.Router();

apiRouter.use("/blogs", blogRouter); // blog 
apiRouter.use("/blogs", commentRouter); // comments on blog
apiRouter.use("/blogs", likeRouter); // likes on blog
apiRouter.use("/querries", querriesRouter); // querries
apiRouter.use("/users", UserRouter); //  users

export default apiRouter;