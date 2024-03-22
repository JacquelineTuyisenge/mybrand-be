// contains our middleware/ server
import dotenv from 'dotenv';
dotenv.config();

import cloudinary from 'cloudinary';

import express from "express"; // creating a server

import apiRouter from './routes/allRoutes';

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express(); // app variable to configure our server 

(cloudinary as any).v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

app.use(express.json()); // middleware
// swagger

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Node js API project for MyBrand",
            version: "1.0.0",
            description: "MyBrand API documentation using Swagger and Express",
        },
        servers: [
            {
                url: 'http://localhost:5000/api'
            }
        ]
    },
    apis: ['./app.ts']
};

//initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use("/api", apiRouter);

//documentation

/**
 * @swagger
 * /api:
 *   get:
 *     summary: this api is used to check if get method is working
 *     description: this api is used to check if get method is working
 *     responses:
 *       200:
 *         description: Welcome to the Blog API
 */
app.get("/api", (req, res) => {
    res.status(200).json({message: 'Welcome to the Blog API'})
})

export default app;