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