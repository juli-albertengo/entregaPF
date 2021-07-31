import {OrdersFactoryDAO} from '../models/DAOs/ordersFactoryDao';

export class ApiOrders {
    public ordersDAO: any

    constructor() {
        this.ordersDAO = OrdersFactoryDAO.get('MONGO')
    }

    async getAllOrdersByUserId(id: string){
        return await this.ordersDAO.getAllOrdersByUserId(id)
    }

    async getSingleOrderByUserId(idUser: string, idOrder: string){
        return await this.ordersDAO.getSingleOrderByUserId(idUser, idOrder)
    }

    async createOrder(order: any){
        return await this.ordersDAO.createOrder(order)
    }

    async completeOrder(id: string) { 
        return await this.ordersDAO.completeOrder(id) 
    }

}