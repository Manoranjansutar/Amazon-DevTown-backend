import fs from 'fs'
import productModel from '../models/productModel.js'
import { v2 as cloudinary } from 'cloudinary'

const addProductController = async (req, res) => {

    const { name, description, brand, category, price, discount, rating, bestseller, newArrival } = req.body

    try {
        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        if (images.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No images uploaded"
            });
        }

        console.log('Received images1:', image1); // Log received images
        console.log('Received images2:', image2); // Log received images
        console.log('Received images3:', image3); // Log received images
        console.log('Received images4:', image4); // Log received images

        let imageUrl = await Promise.all(images.map(async (image) => {
            let result = await cloudinary.uploader.upload(image.path)
            console.log('Uploaded image URL:', result.secure_url); // Log each uploaded image URL
            return result.secure_url
        }))

        const productData = {
            name,
            description,
            brand,
            category,
            price: Number(price),
            discount: Number(discount),
            rating: Number(rating),
            bestseller: bestseller === "true" ? true : false,
            image: imageUrl,
            newArrival: newArrival === "true" ? true : false
        }

        const product = new productModel(productData)

        console.log(name, description, brand, category, price, discount, rating, bestseller, imageUrl)

        await product.save()
        return res.json({
            success: true,
            message: "Product added successfully"
        })
    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: "Something went wrong"
        })
    }
}

//list all products
const listProductsController = async (req, res) => {
    try {
        const products = await productModel.find({})
        return res.json({
            success: true,
            products
        })
    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: "Something went wrong"
        })
    }
}

//delete product
const deleteProductController = async (req, res) => {
    const id = req.params.id
    try {
        await productModel.findByIdAndDelete(id)
        return res.json({
            success: true,
            message: "Product deleted successfully"
        })
    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: "Something went wrong"
        })
    }
}

//list single product
const listSingleProductController = async (req, res) => {
    const id = req.params.id
    try {
        const product = await productModel.findById(id)
        return res.json({
            success: true,
            product
        })
    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: "Something went wrong"
        })
    }
}

// search by brand
const searchBrandController = async (req, res) => {
    const brand = req.params.brand
    try {
        const products = await productModel.find({ brand })
        return res.json({
            success: true,
            products
        })
    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: "Something went wrong"
        })
    }
}

//search by category

const searchCategoryController = async (req, res) => {
    const category = req.params.category
    try {
        const products = await productModel.find({ category })
        return res.json({
            success: true,
            products
        })
    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: "Something went wrong"
        })
    }
}

//sort product high to low

const sortHighToLowController = async (req, res) => {
    try {
        const products = await productModel.find().sort({ price: -1 });
        res.status(200).json({
            success: true,
            products
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }

}

//sort product low to high

const sortLowToHighController = async (req, res) => {
    try {
        const products = await productModel.find().sort({ price: 1 });
        res.status(200).json({
            success: true,
            products
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
}

//search from product name,brand, category

const searchController = async(req,res) =>{
    try {
        const query = req.query.q ? req.query.q.trim() : '';
    
        if (query === '') {
          return res.json([]);
        }
    
        const searchResults = await productModel.find({
          $or: [
            { name: { $regex: new RegExp(query, 'i') } },  
            { brand: { $regex: new RegExp(query, 'i') } },
            { category: { $regex: new RegExp(query, 'i') } },
          ]
        });
    
        res.json(searchResults);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
      }
    
}








export { addProductController, listProductsController, deleteProductController, listSingleProductController, searchBrandController, searchCategoryController, sortHighToLowController, sortLowToHighController , searchController }