import express from 'express';
import { CartsController } from "../controller/carts.controller";

const cartsRouter = express.Router();

class CartsRouter {
    public cartsController: CartsController;

    constructor(){
        this.cartsController = new CartsController()
    }

    start(){
        cartsRouter.get('/id/:id', this.cartsController.getCartById);
        cartsRouter.post('/', this.cartsController.addCart);
        cartsRouter.patch('/:id', this.cartsController.updateCartById);
        cartsRouter.delete('/:id', this.cartsController.deleteCart);
        cartsRouter.get('/*', (req, res) => {res.json({message: `There's nothing to see here`})})
    
        return cartsRouter;
    }

}

export default CartsRouter;