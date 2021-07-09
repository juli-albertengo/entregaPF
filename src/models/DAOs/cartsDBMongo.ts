import mongoDBConnection from '../../services/mongoDBConnection';
import cartModel from '../model/carts.model';
const {loggerFile} = require('../../services/logger');
const errorLog = loggerFile.GetLogger();

export class CartsDBMongoDAO {
    public connection: any;

    constructor() {
    }

    async getCartById(id: string){
        try {
            this.connection = await mongoDBConnection.Get()
            let cart = await cartModel.findOne({_id: id})
            if(!cart){
                return {}
            }
            return cart;
        } catch (error){
            errorLog.error(error)
            return {};
        }
    }

    async addCart(cart: any){
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

    async addProductsToCart(id: string, productsToAdd: any){
        //Encontrar el carrito y modificarlo
        try {
            this.connection = await mongoDBConnection.Get()
            let cart = await cartModel.findOne({_id: id})
            if(!cart){
                return {}
            }
            cart.products = [...cart.products, ...productsToAdd]
            //Guardar el nuevo cart a la DB
            try {
                let modifiedCart = await cart.save();
                return modifiedCart
            } catch (error) {
                errorLog.error(error);
                return {}
            }
        } catch (error){
            errorLog.error(error)
            return {};
        }
    }

    async deleteProductFromCart(id: string, productToDelete: any){
        //Encontrar el carrito
        try {
            this.connection = await mongoDBConnection.Get()
            let cart = await cartModel.findOne({_id: id})
            if(!cart){
                return {}
            }
            cart.products = cart.products.filter((product: any) => {
                return product._id !== productToDelete._id;
            })
            //Guardar el nuevo cart a la DB
            try {
                let modifiedCart = await cart.save();
                return modifiedCart
            } catch (error) {
                errorLog.error(error);
                return {}
            }
        } catch (error){
            errorLog.error(error)
            return {};
        }
    }

    async deleteCart(id: string){
        try {
            this.connection = await mongoDBConnection.Get()
            const deletedCart = await cartModel.findOne({_id: id})
            let responseDeletion = await cartModel.deleteOne({_id: id})
            if(responseDeletion.deletedCount > 0){
                return deletedCart
            } else {
                return {};
            }
        } catch (error){
            errorLog.error(error);
            return {}
        }
    }
}