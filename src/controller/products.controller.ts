import {Request, Response} from 'express';
import {ApiProducts} from '../api/api.products'

export class ProductsController {
    public apiProducts: ApiProducts;

    constructor() {
        this.apiProducts = new ApiProducts()
    }

    getAllProducts = async (req: Request, res: Response) => {
        try {
            let products = await this.apiProducts.getAllProducts();
            res.status(200);
            res.json(products);
        }
        catch(error) {
            console.log(error)
            res.json({message: "There has been an error fetching the products."});
        }
    }

    getProductByCategory = async (req: Request, res: Response) => {
        try {
            const {category} = req.params;
            let products = await this.apiProducts.getProductsByCategory(category);
            res.status(200);
            res.json(products);
        }
        catch(error) {
            console.log(error)
            res.json({message: "There has been an error fetching the products."})
        }
    }

    getProductById = async(req: Request, res: Response) => {
        try {
            const {id} = req.params;
            let product = await this.apiProducts.getProductById(id);
            res.status(200);
            res.json(product);
        }
        catch (error){
            console.log(error);
            res.json({message: "There has been an error fetching the product."})
        }
    }

    addProduct = async (req: Request, res: Response) => {
        try {
            const {name, category, description, foto, price} = req.body;
            let product = {
                name,
                category,
                description,
                foto, 
                price,
            }
            let addedProduct = await this.apiProducts.addProduct(product);
            res.json(addedProduct);
        }
        catch (error){
            console.log(error);
            res.json({message: "There has been an error saving the product."})
        }
    }

    updateProductById = async(req: Request, res: Response) => {
        try {
            const {id, name, category, description, foto, price} = req.body;
            let product = {
                _id: id,
                name,
                category,
                description,
                foto, 
                price
            }
            let modifiedProduct = await this.apiProducts.updateProductById(id, product);
            res.json(modifiedProduct);
        }
        catch (error){
            console.log(error);
            res.json({message: "There has been an error updating the product."})
        }
    }

    deleteProduct = async(req: Request, res: Response) => {
        try{
            const {id} = req.params;
            let deletedProduct = await this.apiProducts.deleteProduct(id);
            res.json(deletedProduct);
        }
        catch (error){
            console.log(error)
            res.json({message: "There has been an error deleting the product."})
        }
    }
}
