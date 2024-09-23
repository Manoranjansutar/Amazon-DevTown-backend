import { addProductController, deleteProductController, listProductsController, listSingleProductController, searchBrandController, searchCategoryController,  searchController,  sortHighToLowController, sortLowToHighController } from '../controllers/productController.js';
import express from 'express'
import upload from '../middleware/multer.js';

const productRouter = express.Router();

productRouter.post('/add_product', upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 },{ name: 'image3', maxCount: 1 },{ name: 'image4', maxCount: 1 }])  , addProductController)
productRouter.get('/list_products' , listProductsController)
productRouter.get('/list_single_product/:id' , listSingleProductController)
productRouter.delete('/delete_product/:id' , deleteProductController)
productRouter.get('/search/brand/:brand' , searchBrandController)
productRouter.get('/search/category/:category' , searchCategoryController)
productRouter.get('/price/sort/high_to_low' , sortHighToLowController)
productRouter.get('/price/sort/low_to_high' , sortLowToHighController)
productRouter.get('/search' , searchController)

export default productRouter;
