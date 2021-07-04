import mongoDBConnection from './mongoDBConnection';
import Product from '../model/products.model';
import productModel from '../model/products.model';

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
            console.log(error)
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
            console.log(error)
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
            console.log(error)
            return {};
        }
    }

    async addProduct(product: typeof Product){
        let productToSave = new productModel(product);
        try {
            this.connection = await mongoDBConnection.Get()
            let savedProduct = await productToSave.save();
            return savedProduct;
        } catch (error) {
            console.log(error);
            return {}
        }
    }

    async updateProductById(id: string, updatedProduct: typeof Product){
        try {
            this.connection = await mongoDBConnection.Get()
            let product = await productModel.updateOne({_id: id}, {$set: updatedProduct});
            if(!product){
                return {error : 'Product not found'}
            }
            return product;
        } catch (error) {
            console.log(error);
            return {}
        }
    }

    async deleteProduct(id: string){
        try {
            this.connection = await mongoDBConnection.Get()
            let product = await productModel.deleteOne({_id: id})
            if(!product){
                return {error: `Product not found`}
            }
            return product;
        } catch (error){
            console.log(error);
            return {}
        }
    }
}

