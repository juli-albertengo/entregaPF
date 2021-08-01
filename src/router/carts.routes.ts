import express from 'express';
import { CartsController } from "../controller/carts.controller";
const passport = require('passport');

const cartsRouter = express.Router();

class CartsRouter {
    public cartsController: CartsController;

    constructor(){
        this.cartsController = new CartsController();
    }

    start(){
        cartsRouter.get('/', passport.authenticate('jwt', {session: false}), this.cartsController.getCartByUserId);

        cartsRouter.post('/add', passport.authenticate('jwt', {session: false}), this.cartsController.addToCart);
        cartsRouter.post('/delete', passport.authenticate('jwt', {session: false}), this.cartsController.deleteFromCart)
        cartsRouter.post('/submit', passport.authenticate('jwt', {session: false}), this.cartsController.submitCart);
        
        cartsRouter.get('/*', (req, res) => {
            res.status(400);
            res.json({message: `Please request a valid url`
        })})
    
        return cartsRouter;
    }

}

export default CartsRouter;