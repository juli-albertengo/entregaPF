import mongoDBConnection from './mongoDBConnection';
import {Order} from '../model/orders.model';
import orderModel from '../model/orders.model';

export class OrdersDBMongoDAO {
    public connection: any;

    constructor() {
    }

    async getOrderById(id: string){
        try {
            this.connection = await mongoDBConnection.Get()
            let cart = await orderModel.findOne({_id: id})
            if(!cart){
                return {}
            }
            return cart;
        } catch (error){
            console.log(error)
            return {};
        }
    }

    async addOrder(order: typeof Order){
        let orderToSave = new orderModel(order);
        try {
            this.connection = await mongoDBConnection.Get()
            let savedOrder = await orderToSave.save();
            return savedOrder
        } catch (error){
            console.log(error);
            return {}
        }
    }

    async updateOrderById(id: string, updatedOrder: typeof Order){
        try {
            this.connection = await mongoDBConnection.Get()
            let order = await orderModel.updateOne({_id: id}, {$set: updatedOrder});
            if(!order){
                return {error : 'Order not found'}
            }
            return order;
        } catch (error) {
            console.log(error);
            return {}
        }
    }

    async deleteOrder(id: string){
        try {
            this.connection = await mongoDBConnection.Get()
            let order = await orderModel.deleteOne({_id: id})
            if(!order){
                return {error: `Order not found`}
            }
            return order;
        } catch (error){
            console.log(error);
            return {}
        }
    }
}