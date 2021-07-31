import mongoDBConnection from '../../services/mongoDBConnection';
import cartModel from '../model/carts.model';
import {Cart} from '../model/carts.model';
const {loggerFile} = require('../../services/logger');
const errorLog = loggerFile.GetLogger();

export class CartsDBMongoDAO {
    public connection: any;

    constructor() {
    }

    async getCartByUserId(id: string){
        try {
            this.connection = await mongoDBConnection.Get()
            let cart = await cartModel.findOne({userId: id})
            if(!cart){
                return {}
            }
            return cart;
        } catch (error){
            errorLog.error(error)
            return {};
        }
    }

    async createCart(cart: Cart){
        let cartToSave = new cartModel(cart);
        try {
            this.connection = await mongoDBConnection.Get()
            let savedCart = await cartToSave.save();
            return savedCart
        } catch (error){
            errorLog.error(error);
            return {}
        }
    }

    async addProductToCart(id: string, idProduct: string, amountOfProduct: number, priceOfProduct: number){
        try {
            this.connection = await mongoDBConnection.Get()
            let cart = await cartModel.findOne({userId: id})
            if(!cart){
                return {}
            }

            //Check: Is the product already in cart?
                //Case a: If it is => Modify that product
                //Case b: If it is not => Add the product to the array
            let productToModify = cart.products.filter((product: any)=>{
                return product.idProduct == idProduct
            })

            if(productToModify.length > 0){
                productToModify[0].amountOfProduct = productToModify[0].amountOfProduct + amountOfProduct
            } else {
                cart.products = [...cart.products, {idProduct, amountOfProduct, priceOfProduct}]
            }

            // Now Save the cart.
            try {
                let responseModification = await cartModel.updateOne({userId: id}, {$set: cart});
                if(responseModification.nModified <= 0){
                    return {}
                }
                const modifiedCart = await cartModel.findOne({userId: id})
                return modifiedCart;
            } catch (error) {
                errorLog.error(error);
                return {}
            }
        } catch (error){
            errorLog.error(error)
            return {};
        }
    }

    async deleteProductFromCart(id: string, idProduct: string, amountOfProduct: number){
        try {
            this.connection = await mongoDBConnection.Get()
            let cart = await cartModel.findOne({userId: id})
            if(!cart){
                return {}
            }

            //Check if the product is in fact in cart & If the amount to decrease is valid
            let productToModify = cart.products.filter((product: any)=>{
                return product.idProduct == idProduct
            })

            if(!productToModify || productToModify[0].amountOfProduct < amountOfProduct){
                return {}
            } else {
                productToModify[0].amountOfProduct = productToModify[0].amountOfProduct - amountOfProduct;
            }


            //Now Save the cart.
            try {
                let responseModification = await cartModel.updateOne({userId: id}, {$set: cart});
                if(responseModification.nModified <= 0){
                    return {}
                }
                const modifiedCart = await cartModel.findOne({userId: id})
                return modifiedCart;
            } catch (error) {
                errorLog.error(error);
                return {}
            }
        } catch (error){
            errorLog.error(error)
            return {};
        }
    }

    async resetCart(id: string){
        try{
            this.connection = await mongoDBConnection.Get()
            let cart = await cartModel.findOne({userId: id})
            cart.products = [];
            let responseModification = await cartModel.updateOne({userId: id}, {$set: cart});
            if(responseModification.nModified <= 0){
                return {}
            }
            return cart;
        }catch(error){
            errorLog.error(error);
            return {}
        }
    }
}