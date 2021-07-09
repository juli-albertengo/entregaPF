import { Request, Response } from 'express';
import {ApiCarts} from '../api/api.carts';
const {loggerFile} = require('../services/logger');
const errorLog = loggerFile.GetLogger();

export class CartsController {
    public apiCarts: ApiCarts;

    constructor() {
        this.apiCarts = new ApiCarts()
    }

    getCartById = async(req: Request, res: Response) => {
        try {
            const {id} = req.params;
            let cart = await this.apiCarts.getCartById(id);
            res.status(200);
            res.json(cart);
        }
        catch (error){
            errorLog.error(error);
            res.json({error: "There has been an error fetching the cart."});
        }
    }

    addCart = async (req: Request, res: Response) => {
        try {
            const {email, timestamp, deliveryAddress, products} = req.body;
            const cart = {
                email,
                timestamp,
                deliveryAddress,
                products
            }
            let addedCart = await this.apiCarts.addCart(cart);
            res.json(addedCart);
        }
        catch (error){
            errorLog.error(error);
            res.json({error: "There has been an error saving the cart"})
        }
    }

    updateCartById = async(req: Request, res: Response) => {
        try {
            const {id} = req.params
            const {productsToAdd, productToDelete} = req.body;
            if(productsToAdd){
                let cart = await this.apiCarts.addProductsToCart(id, productsToAdd)
                res.json(cart);
            } else if (productToDelete){
                let cart = await this.apiCarts.deleteProductFromCart(id, productToDelete)
                res.json(cart);
            } else {
                res.json({message: `Must provide either productsToAdd or productToDelete`})
            }
        }
        catch (error){
            errorLog.error(error);
            res.json({error: "There has been an error updating the cart."})
        }
    }

    deleteCart = async(req: Request, res: Response) => {
        try{
            const {id} = req.params;
            let deletedCart = await this.apiCarts.deleteCart(id);
            res.json(deletedCart);
        }
        catch (error){
            errorLog.error(error)
            res.json({error: "There has been an error deleting the cart."})
        }
    }
}