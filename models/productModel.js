import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  image: {
    type: Array,
    required: true
  },
  bestseller:{
    type:Boolean,
  },
  newArrival:{
    type:Boolean,
  }
});

const productModel = mongoose.model('Product', productSchema) || mongoose.model("Product");

export default productModel;
