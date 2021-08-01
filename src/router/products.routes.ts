import express from 'express';
import { ProductsController } from "../controller/products.controller";
const passport = require('passport');

const productsRouter = express.Router();

class ProductsRouter {
    public ProductsController: ProductsController;

    constructor(){
        this.ProductsController = new ProductsController();
    }

    start(){
        productsRouter.get('/',  this.ProductsController.getAllProducts);
        productsRouter.get('/:category', this.ProductsController.getProductByCategory);
        productsRouter.get('/id/:id', this.ProductsController.getProductById);
        productsRouter.post('/', passport.authenticate('jwt', {session: false}), this.ProductsController.addProduct);
        productsRouter.patch('/:id', passport.authenticate('jwt', {session: false}), this.ProductsController.updateProductById);
        productsRouter.delete('/:id', passport.authenticate('jwt', {session: false}), this.ProductsController.deleteProduct);
        productsRouter.get('/*', (req, res) => {
            res.status(400);
            res.json({message: `Please request a valid url`
        })})
    
        return productsRouter;
    }

}

export default ProductsRouter;