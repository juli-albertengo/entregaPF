import Product from './products.model'

export class Order{
    public id: string
    public items: Array<typeof Product>
    public nroOrder: number
    public timestamp: string
    public status: string
    public email: string

    constructor(id: string, items: Array<typeof Product>, nroOrder: number, timestamp: string, status: string, email: string){
        this.id = id,
        this.items = items,
        this.nroOrder = nroOrder,
        this.timestamp = timestamp,
        this.status = status,
        this.email = email
    }
}


//MONGOOSE MODEL
import mongoose from 'mongoose';

const order = 'order';

const orderSchema = new mongoose.Schema({
    items: {type: Array, required: true, max: 50},
    nroOrder: {type: Number, required: true},
    timestamp: {type: String, required: true},
    status: {type: String, required: true, max: 50},
    email: {type: String, required: true},
})

const orderModel = mongoose.model(order, orderSchema);

export default orderModel; 