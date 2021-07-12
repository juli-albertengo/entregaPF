import productModel from './products.model'
import { IsNotEmpty } from 'class-validator';

export class Order{
    @IsNotEmpty()
    public items: Array<typeof productModel>
    @IsNotEmpty()
    public nroOrder: number
    @IsNotEmpty()
    public timestamp: string
    @IsNotEmpty()
    public status: string
    @IsNotEmpty()
    public email: string

    constructor(items: Array<typeof productModel>, nroOrder: number, timestamp: string, status: string, email: string){
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