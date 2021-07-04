import {Request, Response} from 'express';
import {ApiOrders} from '../api/api.orders'

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
            console.log(error);
            res.json({message: "There has been an error fetching the order."});
        }
    }

    addOrder = async (req: Request, res: Response) => {
        try {
            const {items, nroOrder, timestamp, status, email} = req.body;
            const order = {
                items,
                nroOrder,
                timestamp,
                status,
                email
            }
            let addedOrder = await this.apiOrders.addOrder(order);
            res.json(addedOrder);
        }
        catch (error){
            console.log(error);
            res.json({message: "There has been an error saving the order"})
        }
    }

    updateOrderById = async(req: Request, res: Response) => {
        try {
            const {id, items, nroOrder, timestamp, status, email} = req.body;
            const order = {
                _id: id,
                items,
                nroOrder,
                timestamp,
                status,
                email
            }
            let modifiedOrder = await this.apiOrders.updateOrderById(id, order);
            res.json(modifiedOrder);
        }
        catch (error){
            console.log(error);
            res.json({message: "There has been an error updating the order."})
        }
    }

    deleteOrder = async(req: Request, res: Response) => {
        try{
            const {id} = req.params;
            let deletedOrder = await this.apiOrders.deleteOrder(id);
            res.json(deletedOrder);
        }
        catch (error){
            console.log(error)
            res.json({message: "There has been an error deleting the cart."})
        }
    }
}