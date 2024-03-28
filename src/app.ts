// contains our middleware/ server
import dotenv from 'dotenv';
dotenv.config();

import cloudinary from 'cloudinary';

import express from "express"; // creating a server

import apiRouter from './routes/allRoutes';

import cors from "cors";

import swaggerUi from 'swagger-ui-express';
import fs from "fs";
const jsonData = JSON.parse(fs.readFileSync("./swagger.json", "utf-8"));



const app = express(); // app variable to configure our server 

const corsOpts = {
    origin: '*', // popular origin
    
    methods: [
    'GET',
    'POST',
    'DELETE',
    'PATCH',
    'PUT'
    ]
    };
app.use(cors(corsOpts));


app.use(express.json()); // middleware


app.use("/api", apiRouter);

app.use("/api/doc/", swaggerUi.serve, swaggerUi.setup(jsonData));

app.get("/api", (req, res) => {
    res.status(200).json({message: 'Welcome to the Blog API'})
})

export default app;