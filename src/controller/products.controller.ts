import { Request, Response } from 'express';
import {ApiProducts} from '../api/api.products';
import  {Product} from '../models/model/products.model';
import {validate} from 'class-validator';
const {loggerFile} = require('../services/logger');
const errorLog = loggerFile.GetLogger();

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
            errorLog.error(error)
            res.status(500);
            res.json({error: `There has been an error fetching the products => ${error}`});
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
            errorLog.error(error)
            res.status(500);
            res.json({error: `There has been an error fetching the products => ${error}`})
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
            errorLog.error(error);
            res.status(500);
            res.json({error: "There has been an error fetching the product."})
        }
    }

    addProduct = async (req: any, res: Response) => {
        try {
            const user = req.user;
            if(user.admin === false){
                res.status(401);
                res.json({error: `You must be an admin user to use this route`})
            } else {
                const {name, category, description, fotos, price, stock} = req.body;
                let product = new Product(name, category, description, fotos, price, stock)
                const resultValidation = await validate(product);
                if(resultValidation.length > 0){
                    errorLog.error(resultValidation);
                    res.status(400);
                    res.json({error: `You must provide the required data => ${resultValidation}`});
                } else {
                    let addedProduct = await this.apiProducts.addProduct(product);
                    res.status(201);
                    res.json(addedProduct);
                }
            }
        }
        catch (error){
            errorLog.error(error);
            res.status(500);
            res.json({error: "There has been an error saving the product."})
        }
    }

    updateProductById = async(req: any, res: Response) => {
        try {
            const user = req.user;
            if(user.admin === false){
                res.status(401);
                res.json({error: `You must be an admin user to use this route`})
            } else{
                const {id} = req.params;
                const {name, category, description, fotos, price, stock} = req.body;
                let product = new Product(name, category, description, fotos, price, stock)
                const resultValidation = await validate(product);
                if(resultValidation.length > 0){
                    errorLog.error(resultValidation);
                    res.status(400);
                    res.json({error: `You must provide the required data => ${resultValidation}`});
                } else {
                    let modifiedProduct = await this.apiProducts.updateProductById(id, product);
                    if(Object.keys(modifiedProduct).length == 0){
                        res.status(500);
                        res.json({error: `There has been a problem updating the product`})
                    } else {
                        res.status(200);
                        res.json(modifiedProduct)
                    }
                }
            }
        } catch (error){
            errorLog.error(error);
            res.json({error: "There has been an error updating the product."})
        }
    }

    deleteProduct = async(req: any, res: Response) => {
        try{
            const user = req.user;
            if(user.admin === false){
                res.status(401);
                res.json({error: `You must be an admin user to use this route`})
            } else{
                const {id} = req.params;
                let deletedProduct = await this.apiProducts.deleteProduct(id);
                if(deletedProduct == {}){
                    res.status(404);
                    res.json({})
                } else {
                    res.status(200)
                    res.json(deletedProduct);
                }
            }
        }
        catch (error){
            errorLog.error(error)
            res.status(500);
            res.json({error: "There has been an error deleting the product."})
        }
    }
}
