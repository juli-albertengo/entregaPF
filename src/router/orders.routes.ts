import express from 'express';
import { OrdersController } from "../controller/orders.controller";

const ordersRouter = express.Router();

class OrdersRouter {
    public ordersController: OrdersController;

    constructor(){
        this.ordersController = new OrdersController()
    }

    start(){
        ordersRouter.get('/id/:id', this.ordersController.getOrderById);
        ordersRouter.post('/', this.ordersController.addOrder);
        ordersRouter.patch('/id/:id', this.ordersController.updateOrderById);
        ordersRouter.delete('/id/:id', this.ordersController.deleteOrder);
        ordersRouter.get('/*', (req, res) => {res.json({message: `Please request a valid url`})})
    
        return ordersRouter;
    }

}

export default OrdersRouter;