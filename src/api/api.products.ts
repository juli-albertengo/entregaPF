const config = require('../config');
import {ProductsFactoryDAO} from '../models/DAOs/productsFactoryDAO';
import {Product} from '../models/model/products.model';

export class ApiProducts {
    public productsDAO: any

    constructor() {
        this.productsDAO = ProductsFactoryDAO.get(config.TYPE_OF_PERSISTANCE)
    }

    async getAllProducts() { 
        return await this.productsDAO.getAllProducts() 
    }

    async getProductsByCategory(category: string){
        return await this.productsDAO.getProductsByCategory(category)
    }

    async getProductById(id: string){
        return await this.productsDAO.getProductById(id)
    }

    async addProduct(product: Product) { 
        return await this.productsDAO.addProduct(product) 
    }

    async updateProductById(id: string, product: Product) { 
        return await this.productsDAO.updateProductById(id,product) 
    }
    
    async deleteProduct(id: string) { 
        return await this.productsDAO.deleteProduct(id) 
    }
}
