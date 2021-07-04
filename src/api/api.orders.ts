const config = require('../config');
import {OrdersFactoryDAO} from '../models/DAOs/ordersFactoryDAO'

export class ApiOrders {
    public ordersDAO: any

    constructor() {
        this.ordersDAO = OrdersFactoryDAO.get(config.TYPE_OF_PERSISTANCE)
    }

    async getOrderById(id: string){
        return await this.ordersDAO.getOrderById(id)
    }

    async addOrder(order: any){
        return await this.ordersDAO.addOrder(order)
    }

    async updateOrderById(id: string, order: any) { 
        return await this.ordersDAO.updateOrderById(id,order) 
    }
    
    async deleteOrder(id: string) { 
        return await this.ordersDAO.deleteOrder(id) 
    }
}