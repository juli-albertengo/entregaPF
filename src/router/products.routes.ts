import express from 'express';
import { ProductsController } from "../controller/products.controller";

const productsRouter = express.Router();

class ProductsRouter {
    public ProductsController: ProductsController;

    constructor(){
        this.ProductsController = new ProductsController()
    }

    start(){
        productsRouter.get('/',  this.ProductsController.getAllProducts);
        productsRouter.get('/id/:id', this.ProductsController.getProductById);
        productsRouter.get('/category/:category', this.ProductsController.getProductByCategory);
        productsRouter.post('/', this.ProductsController.addProduct);
        productsRouter.patch('/:id', this.ProductsController.updateProductById);
        productsRouter.delete('/:id', this.ProductsController.deleteProduct);
        productsRouter.get('/*', (req, res) => {res.json({message: `There's nothing to see here`})})
    
        return productsRouter;
    }

}

export default ProductsRouter;

/* OTHER ROUTES I COULD POTENTIALLY USE

//GET /products/:product_name  =>  Obtener productos por su nombre
productsRouter.get('/name/:name', async (req, res)=> {
    const {name} = req.params;
    let products = await productos.getProductsByName(name);
    res.json(products);
})

//GET /productos/:producto_pricerange  =>  Obtener productos por rango de precios
productsRouter.get('/price', async (req, res)=> {
    let min = req.query.min;
    let max = req.query.max;
    let products = await productos.getProductsByPriceRange(min, max);
    res.send(products);
})

*/