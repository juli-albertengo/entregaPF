import {Request, Response} from 'express';
import {ApiCarts} from '../api/api.carts'

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
            console.log(error);
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
            console.log(error);
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
                res.json({error: `Must provide either productsToAdd or productToDelete`})
            }
        }
        catch (error){
            console.log(error);
        }
    }

    deleteCart = async(req: Request, res: Response) => {
        try{
            const {id} = req.params;
            let deletedCart = await this.apiCarts.deleteCart(id);
            res.json(deletedCart);
        }
        catch (error){
            console.log(error)
        }
    }
}