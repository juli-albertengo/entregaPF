import { CartsFactoryDAO } from '../models/DAOs/cartsFactoryDAO'

export class ApiCarts {
    public cartsDAO: any;

    constructor() {
        this.cartsDAO = CartsFactoryDAO.get('MONGO')
    }

    async getCartByUserId(id: string){
        return await this.cartsDAO.getCartByUserId(id)
    }

    async createCart(cart: any){
        return await this.cartsDAO.createCart(cart)
    }

    async addProductToCart(id: string, idProduct: string, amountOfProduct: number, priceOfProduct: number) { 
        return await this.cartsDAO.addProductToCart(id, idProduct, amountOfProduct, priceOfProduct) 
    }

    async deleteProductFromCart(id: string, idProduct: string, amountOfProduct: number) { 
        return await this.cartsDAO.deleteProductFromCart(id, idProduct, amountOfProduct) 
    }

    async resetCart(id: string){
        return await this.cartsDAO.resetCart(id);
    }
}