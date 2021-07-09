import {ApiProducts} from '../api/api.products'
const {loggerFile} = require('../services/logger');
const errorLog = loggerFile.GetLogger();

export class ProductsControllerGQL {
    public apiProducts: ApiProducts;

    constructor() {
        this.apiProducts = new ApiProducts();
    }

    getAllProducts = async () => {
        try {
            let products = await this.apiProducts.getAllProducts();
            return products;
        }
        catch(error) {
            errorLog.error(error)
            return {error: "There has been an error fetching the products."};
        }
    }

    getProductById = async(id: string) => {
        try {
            let product = await this.apiProducts.getProductById(id);
            return product
        }
        catch (error){
            errorLog.error(error);
            return {error: "There has been an error fetching the product."}
        }
    }

    getProductByCategory = async(category: string) => {
        try {
            let products = await this.apiProducts.getProductsByCategory(category);
            return products
        }
        catch(error) {
            errorLog.error(error)
            return {error: "There has been an error fetching the products."}
        }
    }

    addProduct = async (productfromGQL: any) => {
        const {name, category, description, foto, price} = productfromGQL;
        try {
            let product = {
                name,
                category,
                description,
                foto, 
                price,
            }
            let addedProduct = await this.apiProducts.addProduct(product);
            return addedProduct
        }
        catch (error){
            errorLog.error(error);
            return {error: "There has been an error saving the product."};
        }
    }

    updateProductById = async(id: string, product: any) => {
        try {
            let modifiedProduct = await this.apiProducts.updateProductById(id, product);
            return modifiedProduct
        }
        catch (error){
            errorLog.error(error);
            return {error: "There has been an error updating the product."}
        }
    }

    deleteProduct = async(id: string) => {
        try{
            let deletedProduct = await this.apiProducts.deleteProduct(id);
            return deletedProduct;
        }
        catch (error){
            errorLog.error(error)
            return {error: "There has been an error deleting the product."}
        }
    }

}