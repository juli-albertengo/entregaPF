import { IsNotEmpty } from 'class-validator';

export class Cart{
    @IsNotEmpty()
    public userId: string
    @IsNotEmpty()
    public timestamp: string
    @IsNotEmpty()
    public deliveryAddress: DeliveryAddress
    @IsNotEmpty()
    public products: Array<object>

    constructor(userId: string, timestamp: string, deliveryAddress: DeliveryAddress, products: Array<object>){
        this.userId = userId;
        this.timestamp = timestamp;
        this.deliveryAddress = deliveryAddress;
        this.products = products;
    }
}

export class DeliveryAddress{
    @IsNotEmpty()
    public street: string
    @IsNotEmpty()
    public streetNumber: number
    @IsNotEmpty()
    public postalCode: number
    public floor: string
    public appartment: string

    constructor(street: string, streetNumber: number, postalCode: number, floor: string, appartment: string){
        this.street = street,
        this.streetNumber = streetNumber,
        this.postalCode = postalCode,
        this.floor = floor,
        this.appartment = appartment
    }
}


//MONGOOSE MODEL
import mongoose from 'mongoose';

const carts = 'carts';

const cartSchema = new mongoose.Schema({
    userId: {type: String, required: true, unique: true},
    timestamp: {type: String, required: true},
    deliveryAddress: {type: Object, required: true},
    products: {type: Array, required: true}
})

const cartModel = mongoose.model(carts, cartSchema);

export default cartModel;