import { Request, Response } from 'express';
import {ApiCarts} from '../api/api.carts';
import {ApiOrders} from '../api/api.orders';
import {Order} from '../models/model/orders.model';
import {validate} from 'class-validator';
const { sendNewOrderEmail } = require('../utils/nodemailerUtils');
import {ApiProducts} from '../api/api.products';
const {loggerFile} = require('../services/logger');
const errorLog = loggerFile.GetLogger();

const apiProducts = new ApiProducts();
const apiOrders = new ApiOrders();

export class CartsController {
    public apiCarts: ApiCarts;

    constructor() {
        this.apiCarts = new ApiCarts()
    }

    getCartByUserId = async(req: any, res: Response) => {
        try {
            const user = req.user;
            const id = user._id;
            let cart = await this.apiCarts.getCartByUserId(id);
            res.status(200);
            res.json(cart);
        }
        catch (error){
            errorLog.error(error);
            res.status(500);
            res.json({error: "There has been an error fetching the cart."});
        }
    }

    /*
        I'm going to check two things: 
            a. The amount of the product to add is a number
            b. The product the user wants to add is a valid product & there's stock available
    */
    addToCart = async(req: any, res: Response) => {
        try{
            const user = req.user;
            const id = user._id;
            const {idProduct, amountOfProduct} = req.body
            const productToAdd = await apiProducts.getProductById(idProduct);

            //Check A. The amount of the product to add is a number
            if(typeof(amountOfProduct) !== 'number'){
                res.status(400);
                res.json({error: `The product amount should be a number`})

            //Check B. The product exists and there's stock
            } else if (Object.keys(productToAdd).length == 0 || productToAdd.stock < amountOfProduct) {
                res.status(400);
                res.json({error: `The product doesn't exist or the amount exceeds the stock available`})
            } else {

                //If no errors => Perform the update in the cart
                let cart = await this.apiCarts.addProductToCart(id, idProduct, amountOfProduct, productToAdd.price);
                if(Object.keys(cart).length == 0){
                    res.status(400);
                    res.json(cart)
                } else {

                    // Update the product to reflect new stock in DB
                    productToAdd.stock = productToAdd.stock - amountOfProduct;
                    let responseProductUpdate = await apiProducts.updateProductById(productToAdd._id, productToAdd);
                    if(responseProductUpdate.nModified <= 0){
                        errorLog(`There's been an error updating stock in product => ${responseProductUpdate}`)
                    }

                    //Finally return the cart
                    res.status(200);
                    res.json(cart);
                }
            }
        } catch (error){
            errorLog.error(error);
            res.status(500)
            res.json({error: "There has been an error updating the cart."})
        }
    }

    /*
        I'm going to check two things: 
            a. The amount of the product is a number
            b. The product the user wants to take away is a valid product
    */

    deleteFromCart = async(req: any, res: Response) => {
        try{
            const user = req.user;
            const id = user._id;
            const {idProduct, amountOfProduct} = req.body
            const productToDelete = await apiProducts.getProductById(idProduct);

            //Check A. The amount of the product is a number
            if(typeof(amountOfProduct) !== 'number'){
                res.status(400);
                res.json({error: `The product amount should be a number`})

            //Check B. The product is valid    
            } else if(Object.keys(productToDelete).length == 0) {
                res.status(400);
                res.json({error: `The product doesn't exist`})
            } else {

                //If no errors => Perform the update
                let cart = await this.apiCarts.deleteProductFromCart(id, idProduct, amountOfProduct);
                if(Object.keys(cart).length == 0){
                    res.status(400);
                    res.json(cart)
                } else {

                    // Update the product to reflect new stock in DB
                    productToDelete.stock = productToDelete.stock + amountOfProduct;
                    let responseProductUpdate = await apiProducts.updateProductById(productToDelete._id, productToDelete);
                    if(responseProductUpdate.nModified <= 0){
                        errorLog(`There's been an error updating stock in product => ${responseProductUpdate}`)
                    }

                    //Finally return the cart
                    res.status(200);
                    res.json(cart);
                }
            }
        } catch (error){
            errorLog.error(error);
            res.status(500)
            res.json({error: "There has been an error updating the cart."})
        }
    }

    /*
        submitCart has 3 Steps:
            1. Check if the cart is not empty
            2. Generate the order
            3. Clean the cart and send the email of NewOrder!
    */

    submitCart = async(req: any, res: Response) => {
        try{
            const user = req.user;
            const id = user._id;
            let cart = await this.apiCarts.getCartByUserId(id);
            
            //STEP 1: Check if cart is not empty
            if(cart.products.length <= 0){
                res.status(400);
                res.json({error: `The cart is empty`})
            } else {

                //STEP 2: Generate Order
                const timestamp = new Date(Date.now()).toDateString();
                let orderTotal = 0
                cart.products.forEach( (product: any) => {
                    orderTotal = orderTotal + product.priceOfProduct * product.amountOfProduct
                });
                const order = new Order(id, cart.products, timestamp, 'Generated', orderTotal)
                const resultValidation = await validate(order);
                if(resultValidation.length > 0){
                    errorLog.error(resultValidation);
                    res.status(500);
                    res.json({error: `There has been an error creating the order => ${resultValidation}`});
                } else {
                    const createdOrder = await apiOrders.createOrder(order);
                    if(Object.keys(createdOrder).length == 0){
                        res.status(500);
                        res.json({error: `There has been an error creating the order`})
                    } else {
                        //STEP 3: Clean the cart & send Email
                        const modifiedCart = await this.apiCarts.resetCart(id);
                        sendNewOrderEmail(user.email);

                        res.status(201);
                        res.json({createdOrder, emptyCart: modifiedCart});
                    }
                }
            }
        } catch (error){
            errorLog.error(error);
            res.status(500)
            res.json({error: "There has been an error creating the order."})
        }
    }
}