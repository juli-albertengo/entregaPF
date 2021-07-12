import {Request, Response} from 'express';
import {ApiOrders} from '../api/api.orders';
const { sendNewOrderEmail } = require('../utils/nodemailerUtils');
const {loggerFile} = require('../services/logger');
const errorLog = loggerFile.GetLogger();

export class OrdersController {
    public apiOrders: ApiOrders;

    constructor() {
        this.apiOrders = new ApiOrders()
    }

    getOrderById = async(req: Request, res: Response) => {
        try {
            const {id} = req.params;
            let order = await this.apiOrders.getOrderById(id);
            res.status(200);
            res.json(order);
        }
        catch (error){
            errorLog.error(error);
            res.json({error: "There has been an error fetching the order."});
        }
    }

    addOrder = async (req: Request, res: Response) => {
        try {
            const {items, nroOrder, status, email} = req.body;
            if(
                items !== undefined && items !== null &&
                nroOrder !== undefined && nroOrder !== null &&
                status !== undefined && status !== null &&
                email !== undefined && email !== null
            ){
                const order = {items, nroOrder, status, timestamp: new Date(Date.now()).toDateString(), email,}
                let addedOrder = await this.apiOrders.addOrder(order);
                sendNewOrderEmail(email);
                res.json(addedOrder);
            } else {
                errorLog.error(`User didn't provide the data required`)
                res.json({})
            }
        }
        catch (error){
            errorLog.error(error);
            res.json({error: "There has been an error saving the order"})
        }
    }

    updateOrderById = async(req: Request, res: Response) => {
        try {
            const {id} = req.params;
            const {items, nroOrder, timestamp, status, email} = req.body;
            if(
                items !== undefined && items !== null &&
                nroOrder !== undefined && nroOrder !== null &&
                status !== undefined && status !== null &&
                email !== undefined && email !== null
            ){
                const order = {items, nroOrder, status, timestamp: new Date(Date.now()).toDateString(), email,}
                let modifiedOrder = await this.apiOrders.updateOrderById(id, order);
                res.json(modifiedOrder);
            } else {
                errorLog.error(`User didn't provide the data required`)
                res.json({})
            }
        }
        catch (error){
            errorLog.error(error);
            res.json({error: "There has been an error updating the order."})
        }
    }

    deleteOrder = async(req: Request, res: Response) => {
        try{
            const {id} = req.params;
            let deletedOrder = await this.apiOrders.deleteOrder(id);
            res.json(deletedOrder);
        }
        catch (error){
            errorLog.error(error)
            res.json({error: "There has been an error deleting the cart."})
        }
    }
}