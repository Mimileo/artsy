import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
}, {
    timestamps: true // createdAt, updatedAt timestaps will be added
});

// create Product collection and use this schema
const Product = mongoose.model("Product", productSchema);
// mongoose wiil convert Model to lowercase models, ex Product -> products

// we wnat to use our model in the rest of our app
export default Product;