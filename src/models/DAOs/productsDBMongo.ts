import mongoDBConnection from '../../services/mongoDBConnection';
import productModel from '../model/products.model';
import {Product} from '../model/products.model';
const {loggerFile} = require('../../services/logger');
const errorLog = loggerFile.GetLogger();

export class ProductsDBMongoDAO {
    public connection: any;

    constructor() {
    }

    async getAllProducts(){
        try {
            this.connection = await mongoDBConnection.Get()
            const products = await productModel.find({})
            if(products === null || products === []){
                return []
            }
            return products;
        } catch (error){
            errorLog.error(error)
            return [];
        }
    }

    async getProductsByCategory(category: string){
        try{
            this.connection = await mongoDBConnection.Get()
            let products = await productModel.find({category: category})
            if(products === null || products === []){
                return []
            }
            return products;
        } catch (error){
            errorLog.error(error)
            return [];
        }

    }

    async getProductById(id: string){
        try {
            this.connection = await mongoDBConnection.Get()
            let product = await productModel.findOne({_id: id})
            if(!product){
                return {}
            }
            return product;
        } catch (error){
            errorLog.error(error)
            return {};
        }
    }

    async addProduct(product: Product){
        let productToSave = new productModel(product);
        try {
            this.connection = await mongoDBConnection.Get()
            let savedProduct = await productToSave.save();
            return savedProduct;
        } catch (error) {
            errorLog.error(error);
            return {}
        }
    }

    async updateProductById(id: string, updatedProduct: Product){
        try {
            this.connection = await mongoDBConnection.Get()
            let responseModification = await productModel.updateOne({_id: id}, {$set: updatedProduct});
            if(responseModification.nModified <= 0){
                return {}
            }
            const modifiedProduct = await productModel.findOne({_id: id})
            return modifiedProduct;
        } catch (error) {
            errorLog.error(error);
            return {}
        }
    }

    async deleteProduct(id: string){
        try {
            this.connection = await mongoDBConnection.Get()
            const deletedProduct = await productModel.findOne({_id: id})
            let responseDeletion = await productModel.deleteOne({_id: id})
            if(responseDeletion.deletedCount > 0){
                return deletedProduct
            } else {
                return {};
            }
        } catch (error){
            errorLog.error(error);
            return {}
        }
    }
}

