const config = require('./config');
const express = require('express');
import {Request, Response} from 'express';
const passport = require('passport');
const jwtStrategy = require('./middleware/passportAuthMiddleware');
const app = express()

import ProductsRouter from './router/products.routes';
import CartsRouter from './router/carts.routes';
import OrdersRouter from './router/orders.routes';
import AuthRouter from './router/auth.routes';
import UserRouter from './router/user.routes';


const routerProducts = new ProductsRouter();
const routerCarts = new CartsRouter();
const routerOrders = new OrdersRouter();
const routerAuth = new AuthRouter();
const routerUser = new UserRouter();


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(passport.initialize());
passport.use(jwtStrategy);

app.use(express.static('public'));

app.use('/products', routerProducts.start());
app.use('/carts', routerCarts.start());
app.use('/orders', routerOrders.start());
app.use('/auth', routerAuth.start());
app.use('/user', routerUser.start());


app.get('/', (req: Request, res: Response)=>{
    res.status(200)
    res.json({message: `Welcome Page - Home`});
})

app.get('/error', (req: Request, res: Response)=> {
    res.json({message: "There has been an unexpected error, please try again."})
})

app.get('/*', (req: Request, res: Response) => {
    res.json({message: `Please request a valid url`});
})

app.listen(config.PORT, ()=> {
    console.log(`Server listening on ${config.PORT}`)
})