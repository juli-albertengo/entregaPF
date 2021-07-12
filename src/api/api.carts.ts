import { CartsFactoryDAO } from '../models/DAOs/cartsFactoryDAO'

export class ApiCarts {
    public cartsDAO: any;

    constructor() {
        this.cartsDAO = CartsFactoryDAO.get('MONGO')
    }

    async getCartById(id: string){
        return await this.cartsDAO.getCartById(id)
    }

    async addCart(cart: any){
        return await this.cartsDAO.addCart(cart)
    }

    async addProductsToCart(id: string, products: any) { 
        return await this.cartsDAO.addProductsToCart(id, products) 
    }

    async deleteProductFromCart(id: string, products: any) { 
        return await this.cartsDAO.deleteProductFromCart(id, products) 
    }
    
    async deleteCart(id: string) { 
        return await this.cartsDAO.deleteCart(id) 
    }
}