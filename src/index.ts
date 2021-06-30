const config = require('./config');
const express = require('express');
import {Request, Response} from 'express';
const passport = require('passport');
const jwtStrategy = require('./middleware/passportAuthMiddleware');
const app = express()

import ProductsRouter from './router/products.routes';
import CartsRouter from './router/carts.routes';
import AuthRouter from './router/auth.routes';
//import OrdersRouter from './router/orders.routes';

const routerProducts = new ProductsRouter();
const routerCarts = new CartsRouter();
const routerAuth = new AuthRouter();
//const routerOrders = new OrdersRouter();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(passport.initialize());
passport.use('jsonwebtoken', jwtStrategy);

app.use(express.static('public'));

app.use('/products', routerProducts.start());
app.use('/carts', routerCarts.start());
app.use('/auth', routerAuth.start());
//app.use('/orders', routerOrders.start());

app.get('/', (req: Request, res: Response)=>{
    res.status(200)
    res.json({message: `Welcome Page`});
})

app.get('/error', (req: Request, res: Response)=> {
    res.json({message: "There has been an unexpected error, please try again."})
})

app.get('/*', (req: Request, res: Response) => {
    res.json({message: `There's nothing to see here`});
})

app.listen(config.PORT, ()=> {
    console.log(`Server listening on ${config.PORT}`)
})