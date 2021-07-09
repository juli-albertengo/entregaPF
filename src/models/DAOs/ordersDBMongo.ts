import mongoDBConnection from '../../services/mongoDBConnection';
import orderModel from '../model/orders.model';
const {loggerFile} = require('../../services/logger');
const errorLog = loggerFile.GetLogger();

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
            errorLog.error(error)
            return {};
        }
    }

    async addOrder(order: any){
        let orderToSave = new orderModel(order);
        try {
            this.connection = await mongoDBConnection.Get()
            let savedOrder = await orderToSave.save();
            return savedOrder
        } catch (error){
            errorLog.error(error);
            return {}
        }
    }

    async updateOrderById(id: string, updatedOrder: any){
        try {
            this.connection = await mongoDBConnection.Get()
            let responseModification = await orderModel.updateOne({_id: id}, {$set: updatedOrder});
            if(responseModification.nModified <= 0){
                return {}
            }
            const modifiedOrder = await orderModel.findOne({_id: id})
            return modifiedOrder;
        } catch (error) {
            errorLog.error(error);
            return {}
        }
    }

    async deleteOrder(id: string){
        try {
            this.connection = await mongoDBConnection.Get()
            const deletedOrder = await orderModel.findOne({_id: id})
            let responseDeletion = await orderModel.deleteOne({_id: id})
            if(responseDeletion.deletedCount > 0){
                return deletedOrder
            } else {
                return {};
            }
        } catch (error){
            errorLog.error(error);
            return {}
        }
    }
}