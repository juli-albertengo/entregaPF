import mongoDBConnection from '../../services/mongoDBConnection';
import orderModel from '../model/orders.model';
import {Order} from '../model/orders.model';
const {loggerFile} = require('../../services/logger');
const errorLog = loggerFile.GetLogger();

export class OrdersDBMongoDAO {
    public connection: any;

    constructor() {
    }

    async getAllOrdersByUserId(id: string){
        try {
            this.connection = await mongoDBConnection.Get()
            let orders = await orderModel.find({userId: id})
            if(!orders){
                return []
            }
            return orders;
        } catch (error){
            errorLog.error(error)
            return [];
        }
    }

    async getSingleOrderByUserId(userId: string, orderId: string){
        try {
            this.connection = await mongoDBConnection.Get()
            let order = await orderModel.findOne({_id: orderId})
            if(!order){
                return {}
            }
            if(order.userId != userId){
                return {}
            }
            return order;
        } catch (error){
            errorLog.error(error)
            return {};
        }
    }

    async createOrder(order: Order){
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

    async completeOrder(id: Order){
        try {
            this.connection = await mongoDBConnection.Get()
            let order = await orderModel.findOne({_id: id})
            if(!order){
                return {}
            }
            order.status = 'Completed'
            const responseModification = await orderModel.updateOne({_id: order._id}, {$set: order})
            if(responseModification.nModified <= 0){
                return {}
            }
            return order;
        } catch (error){
            errorLog.error(error)
            return [];
        }
    }


}