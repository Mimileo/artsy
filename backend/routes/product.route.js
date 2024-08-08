import express from "express";
import { getHome, createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/product.controller.js";

const router = express.Router();

// create a route for index
router.get('/hello', getHome);

router.get("/", getProducts);

// Await expressions make promise-returning functions behave as though they're synchronous by suspending execution until the returned promise is fulfilled or rejected. The resolved value of the promise is treated as the return value of the await expression. 
router.post("/", createProduct);

router.put("/:id", updateProduct);

// console.log(process.env.MONGO_URI);
router.delete("/:id", deleteProduct);

export default router;

// Async/Await is a way of writing promises that
// allows us to write asynchronous code in a synchronous way