// create express app
// old way 
// const expresss = require('express');
import express from 'express';
import dotenv from "dotenv";
import path from "path";

import { connectDB } from './config/db.js'; // import this so we can call the db from server
import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json()); // middleware(runs before you senda response back to cleint) that allows accept JSON data in the request body

app.use("/api/products", productRoutes);

// check for environment
if(process.env.NODE_ENV === "production") {
    // then deploy application, we need a differnt configuration
    // make frontend folder our static assets since it's the ract app
    // When you run your React app, you run npm build, which "build": "vite build" -> which gives the frontend folder

    // serve our frontend app
    // we make the dist folder to be our static assets
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    // path.join(__dirname, "/frontend/dist")
    //  path.join(__dirname - says go under the root, from their go to frontend and then dist folder

    // if we send any requests, if we get anything other than the dist folder, then render our react app
    app.get("*", (req, res) => {
        // we wnat to send the index.html under dist folder, return this other than the /api/products
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    })
}
app.listen(PORT, () => {
    connectDB(); // call ass soon as we lsiten to our application
    console.log('Server started at http:://localhost:' + PORT);

});