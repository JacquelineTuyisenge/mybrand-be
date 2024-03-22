/**
 * @swagger
 * tags:
 *   name: Blog
 *   description: Blog API
 */

import express from "express";

import multer from "multer";

import httpBlog from '../controllers/blog.controllers';

import isValid from '../middlewares/blogMiddleware';

import authenticateLogin from "../middlewares/authentication";

const blogRouter = express.Router(); // specific router for blog

const upload = multer({ dest: "./src/uploads" });

/**
 * @swagger
 * /api/blogs:
 *   get:
 *     summary: Get all blogs
 *     tags: [Blog]
 *     responses:
 *       200:
 *         description: Get all blogs
 *   post:
 *     summary: Create blog
 *     tags: [Blog]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               content:
 *                 type: string
 *               image:
 *                 type: file
 *     responses:
 *       201:
 *         description: Create blog
 *       400:
 *         description: Bad request
 */

// get all blogs
blogRouter.get("/", httpBlog.httpGetBlog);

 // create blog, also here we used isValid
blogRouter.post("/", upload.single("image"), isValid, authenticateLogin, httpBlog.httpCreateBlog);


/**
 * @swagger
 * /api/blogs/{id}:
 *   get:
 *     summary: Get single blog
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the blog
 *     responses:
 *       200:
 *         description: Get single blog
 *       404:
 *         description: Blog Not found
 *   patch:
 *     summary: Update blog
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the blog
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Blog updated successfully
 *       404:
 *         description: Blog Not found
 *   delete:
 *     summary: Delete blog
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the blog
 *     responses:
 *       204:
 *         description: Blog deleted successfully
 *       404:
 *         description: Blog Not found
 */
// get individual blog post
blogRouter.get("/:id", httpBlog.httpGetSingleBlog);

// Update the blog , single blog
blogRouter.patch("/:id",authenticateLogin ,  httpBlog.httpUpdateSingleBlog);

// delete blog post
blogRouter.delete("/:id",authenticateLogin ,httpBlog.httpDeleteSingleBlog);

export default blogRouter; // export the blogrouter