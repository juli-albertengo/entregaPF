import productModel from './products.model';
import { IsNotEmpty } from 'class-validator';

export class Cart{
    @IsNotEmpty()
    public email: string
    @IsNotEmpty()
    public timestamp: Date
    @IsNotEmpty()
    public deliveryAddress: string
    @IsNotEmpty()
    public products: Array<typeof productModel>

    constructor(email: string, timestamp: Date, deliveryAddress: string, products: Array<typeof productModel>){
        this.email = email;
        this.timestamp = timestamp;
        this.deliveryAddress = deliveryAddress;
        this.products = products;
    }
}

export class Carts{
    carts: Array<Cart>;
    
    constructor(arrayCarts: Array<Cart>){
        this.carts = arrayCarts;
    }
}


//MONGOOSE MODEL
import mongoose from 'mongoose';

const carts = 'carts';

const cartSchema = new mongoose.Schema({
    email: {type: String, required: true, max: 50},
    timestamp: {type: String, required: true},
    deliveryAddress: {type: String, required: true},
    products: {type: Array, required: true}
})

const cartModel = mongoose.model(carts, cartSchema);

export default cartModel;