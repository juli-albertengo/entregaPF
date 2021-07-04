import mongoDBConnection from '../../services/mongoDBConnection';
import Product from '../model/products.model';
import {Cart} from '../model/carts.model';
import cartModel from '../model/carts.model';

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
            console.log(error)
            return {};
        }
    }

    async addCart(cart: typeof Cart){
        let cartToSave = new cartModel(cart);
        try {
            this.connection = await mongoDBConnection.Get()
            let savedCart = await cartToSave.save();
            return savedCart
        } catch (error){
            console.log(error);
            return {}
        }
    }

    async addProductsToCart(id: string, productsToAdd: Array<typeof Product>){
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
                console.log(error);
                return {error: `There has been an error saving new cart => ${error}`}
            }
        } catch (error){
            console.log(error)
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
                console.log(error);
                return {error: `There has been an error saving new cart => ${error}`}
            }
        } catch (error){
            console.log(error)
            return {};
        }
    }

    async deleteCart(id: string){
        try {
            this.connection = await mongoDBConnection.Get()
            let cart = await cartModel.deleteOne({_id: id})
            if(!cart){
                return {error: `Product not found`}
            }
            return cart;
        } catch (error){
            console.log(error);
            return {}
        }
    }
}