const config = require('./config');
const express = require('express');
import { Request, Response } from 'express';
import path from 'path'
import {ApiMessages} from '../src/api/api.messages'; 
const passport = require('passport');
const jwtStrategy = require('./middleware/passportAuthMiddleware');
const {loggerFile} = require('./services/logger');
const errorLog = loggerFile.GetLogger();

const app = express();

const http = require('http').createServer(app);
const io = require('socket.io')(http);

const apiMessages = new ApiMessages();

import ImagesRouter from './router/images.routes';
import ProductsRouter from './router/products.routes';
import CartsRouter from './router/carts.routes';
import OrdersRouter from './router/orders.routes';
import AuthRouter from './router/auth.routes';

const routerImages = new ImagesRouter();
const routerProducts = new ProductsRouter();
const routerCarts = new CartsRouter();
const routerOrders = new OrdersRouter();
const routerAuth = new AuthRouter();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(passport.initialize());
passport.use(jwtStrategy);

app.use(express.static('public'));

app.use('/api/images', routerImages.start());
app.use('/api/products', routerProducts.start());
app.use('/api/cart', routerCarts.start());
app.use('/api/orders', routerOrders.start());
app.use('/api/user', routerAuth.start());

app.get('/chat', (req:Request, res:Response) => {
    res.sendFile(path.join(__dirname + '/../public/index.html'));
})  

io.on('connection', async(socket:any) => {
   socket.on('new-message', async(data: any) => {
       //Check for valid users
        const checkedUsername = await apiMessages.checkUsername(data.username);
        if(Object.keys(checkedUsername).length === 0){
            io.emit('wrong-username', data.username)
        } else {
            //Save the message
            const savedMessageFromUser = await apiMessages.saveMessage(checkedUsername, data.message);
            if(Object.keys(savedMessageFromUser).length === 0){
                errorLog.error(`There has been an error saving User message in DB`);
            }

            //Respond to Frontend
            const responseFromServer = await apiMessages.getAnswerFromServer(data.username, data.message);
            const savedMessageFromServer = await apiMessages.saveMessage('Server', responseFromServer.message);
            if(Object.keys(savedMessageFromServer).length === 0){
                errorLog.error(`There has been an error saving Server message in DB`);
            }
            io.emit('resp-message', responseFromServer);
        }
   })
})

app.get('/home', (req: Request, res: Response)=>{
    res.status(200);
    res.json({message: `Welcome Page - Home`});
})


app.get('/error', (req: Request, res: Response)=> {
    res.status(500);
    res.json({error: "There has been an unexpected error, please try again."});
})

app.get('/*', (req: Request, res: Response) => {
    res.status(400);
    res.json({message: `Please request a valid url`});
})

http.listen(config.PORT, ()=> {
    console.log(`Server listening on ${config.PORT}`);
})