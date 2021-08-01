import {Response} from 'express';
import {ApiOrders} from '../api/api.orders';
const {loggerFile} = require('../services/logger');
const errorLog = loggerFile.GetLogger();

export class OrdersController {
    public apiOrders: ApiOrders;

    constructor() {
        this.apiOrders = new ApiOrders()
    }

    getAllOrdersByUserId = async(req: any, res: Response) => {
        try {
            const user = req.user
            const id = user._id;
            let orders = await this.apiOrders.getAllOrdersByUserId(id);
            res.status(200);
            res.json(orders);
        }
        catch (error){
            errorLog.error(error);
            res.status(500);
            res.json({error: "There has been an error fetching the order."});
        }
    }

    getSingleOrderByUserId = async(req: any, res: Response) => {
        try {
            const user = req.user
            const idUser = user._id;
            const {id} = req.params
            let order = await this.apiOrders.getSingleOrderByUserId(idUser, id);
            res.status(200);
            res.json(order);
        }
        catch (error){
            errorLog.error(error);
            res.status(500);
            res.json({error: "There has been an error fetching the order."});
        }
    }

    completeOrder = async (req: any, res: Response) => {
        try {
            const user = req.user;
            const idUser = user._id;
            const {idOrder} = req.body
            let order = await this.apiOrders.getSingleOrderByUserId(idUser, idOrder)
            if(Object.keys(order).length == 0){
                res.status(400);
                res.json({error: `The order doesn't exist`})
            } else if(order.status != 'Generated'){
                res.status(400);
                res.json({error: `The order's status is ${order.status}`})
            } else {
                let modifiedOrder = await this.apiOrders.completeOrder(order);
                if(Object.keys(modifiedOrder).length == 0){
                    res.status(500);
                    res.json({error: `There has been a problem updating the order`})
                } else {
                    res.status(200);
                    res.json(modifiedOrder)
                }
            }
        }
        catch (error){
            errorLog.error(error);
            res.status(500);
            res.json({error: "There has been an error updating the order"})
        }
    }
}