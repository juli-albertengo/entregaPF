import express from 'express';
import { OrdersController } from "../controller/orders.controller";
const passport = require('passport');

const ordersRouter = express.Router();

class OrdersRouter {
    public ordersController: OrdersController;

    constructor(){
        this.ordersController = new OrdersController();
    }

    start(){
        ordersRouter.get('/', passport.authenticate('jwt', {session: false}), this.ordersController.getAllOrdersByUserId);
        ordersRouter.get('/:id', passport.authenticate('jwt', {session: false}), this.ordersController.getSingleOrderByUserId);
        ordersRouter.post('/complete', passport.authenticate('jwt', {session: false}), this.ordersController.completeOrder);
        ordersRouter.get('/*', (req, res) => {
            res.status(400);
            res.json({message: `Please request a valid url`
        })})
    
        return ordersRouter;
    }

}

export default OrdersRouter;