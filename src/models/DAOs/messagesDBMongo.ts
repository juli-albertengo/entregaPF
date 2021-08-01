import mongoDBConnection from '../../services/mongoDBConnection';
import messageModel, {Message} from '../model/message.model';
import userModel from '../model/user.model'
import {validate} from 'class-validator'
import {ApiProducts} from '../../api/api.products';
import {ApiOrders} from '../../api/api.orders';
import {ApiCarts} from '../../api/api.carts';
const {loggerFile} = require('../../services/logger');
const errorLog = loggerFile.GetLogger();

const apiProducts = new ApiProducts();
const apiOrders = new ApiOrders();
const apiCarts = new ApiCarts();

export class MessagesDBMongoDAO {
    public connection: any;

    constructor() {
    }

    async checkUsername(username: string){
        try {
            this.connection = await mongoDBConnection.Get()
            let user = await userModel.findOne({'username': username})
            if(user == null){
                return {}
            } else {
                return user;
            }
        } catch (error){
            errorLog.error(error)
            return {};
        }
    }

    async saveMessage(userData: any, messageValue: any){
        let type = '';
        let id = '';
        if(userData == 'Server'){
            type = 'Server'
            id = 'Server'
        } else {
            type = 'User'
            id = userData._id
        }
        const messageToValidate = new Message(id, type, messageValue);
        const resultValidationMessage = await validate(messageToValidate);
        if(resultValidationMessage.length > 0){
            errorLog.error(resultValidationMessage);
            return {}
        } else {
            const messageToSave = new messageModel(messageToValidate);
            try{
                this.connection = await mongoDBConnection.Get();
                let savedMessage = await messageToSave.save();
                return savedMessage;
            } catch(error){
                errorLog.error(error);
                return {};
            }
        }
    }

    async getAnswerFromServer(userData: any, messageValue: any){
        switch(messageValue){
            case 'Stock':
                const products = await apiProducts.getAllProducts();
                const stock = {
                    typeOfResponse: 'stock',
                    message : JSON.stringify(products)
                }
                return stock;
            case 'Orders':
                const orderUser = await userModel.findOne({'username': userData})
                const userOrder = await apiOrders.getAllOrdersByUserId(orderUser._id);
                const order = {
                    typeOfResponse: 'order',
                    message: JSON.stringify(userOrder)
                }
                return order;
            case 'Cart':
                const cartUser = await userModel.findOne({'username': userData})
                const userCart = await apiCarts.getCartByUserId(cartUser._id);
                const cart = {
                    typeOfResponse: 'cart',
                    message: JSON.stringify(userCart)
                }
                return cart
            default:
              const defaultMessage = `Hello! I couldn't understand your message. Please provide one of the following options:
                        Stock: To receive our current stock.
                        Orders: To receive the information of your orders.
                        Cart: To receive the current state of your cart
                        `
                const defaultResponse = {
                    typeOfResponse: 'default',
                    message: defaultMessage
                }
                return defaultResponse
        }
    }
}