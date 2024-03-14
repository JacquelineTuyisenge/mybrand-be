// contains our middleware/ server

import express from "express"; // creating a server

import apiRouter from './routes/allRoutes';

const app = express(); // app variable to configure our server 

app.use(express.json()); // middleware

app.use("/api", apiRouter);

export default app;