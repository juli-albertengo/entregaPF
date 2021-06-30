import Product from './products.model';

export class Cart{
    public id: string
    public email: string
    public timestamp: Date
    public deliveryAddress: string
    public products: Array<typeof Product>

    constructor(id: string, email: string, timestamp: Date, deliveryAddress: string, products: Array<typeof Product>){
        this.id = id;
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