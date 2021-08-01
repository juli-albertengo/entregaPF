import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class Order{
    @IsNotEmpty()
    public userId: string
    @IsNotEmpty()
    public items: Array<object>
    @IsNotEmpty()
    public timestamp: string
    @IsNotEmpty()
    @IsString()
    public status: string
    @IsNotEmpty()
    @IsInt()
    public orderTotal: number


    constructor(userId: string, items: Array<object>, timestamp: string, status: string, orderTotal: number){
        this.userId = userId,
        this.items = items,
        this.timestamp = timestamp,
        this.status = status,
        this.orderTotal = orderTotal
    }
}


//MONGOOSE MODEL
import mongoose from 'mongoose';

const order = 'order';

const orderSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    items: {type: Array, required: true, max: 50},
    timestamp: {type: String, required: true},
    status: {type: String, required: true, max: 50},
    orderTotal: {type: Number, required: true},
})

const orderModel = mongoose.model(order, orderSchema);

export default orderModel; 