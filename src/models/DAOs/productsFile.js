const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const {loggerFile} = require('../../services/logger');
const errorLog = loggerFile.GetLogger();

class ProductsFileDAO {

    constructor(fileName) {
        this.fileName = fileName;
    }

    async getAllProducts(){
        try{
            const products = JSON.parse(await fs.promises.readFile(this.fileName,'utf-8'));
            return products
        } catch(error){
            errorLog.error(error);
        }

    }

    async getProductsByCategory(category){
        try{
            const products = JSON.parse(await fs.promises.readFile(this.fileName,'utf-8'));
            let filteredProducts = products.filter(product => {
                return product.category === category
            })
            return filteredProducts;
        } catch(error){
            errorLog.error(error);
        }

    }

    async getProductById(id){
        try {
            const products = JSON.parse(await fs.promises.readFile(this.fileName,'utf-8'));
            let filteredProduct = products.filter(product => {
                return product._id === id;
            })
            if(!filteredProduct[0]){
                return {}
            }
            return filteredProduct[0];
        } catch (error){
            errorLog.error(error);
        }

    }

    async addProduct(product){
        try {
            const products = JSON.parse(await fs.promises.readFile(this.fileName,'utf-8'));
            product._id = uuidv4();
            products.push(product);
            await fs.promises.writeFile(this.fileName, JSON.stringify(products));
            return product;
        } catch(error){
            errorLog.error(error);
        }
    }

    async updateProductById(id, updatedProduct){
        try{
            const products = JSON.parse(await fs.promises.readFile(this.fileName,'utf-8'));
            let filteredProducts = products.filter(product => {
                return product._id === id;
            })
            console.log(filteredProducts);
            if(filteredProducts.length <= 0){
                return {}
            } else {
                let productToModify = filteredProducts[0];
                productToModify.name = updatedProduct.name;
                productToModify.category = updatedProduct.category;
                productToModify.description = updatedProduct.description;
                productToModify.foto = updatedProduct.foto;
                productToModify.price = updatedProduct.price;
                let remainingProducts = products.filter(product => {
                    return product._id !== id;
                })
                remainingProducts.push(productToModify);
                await fs.promises.writeFile(this.fileName, JSON.stringify(remainingProducts));
                return updatedProduct;
            }
        } catch(error){
            errorLog.error(error);
        }

    }

    async deleteProduct(id){
        try{
            let productToDelete = {}
            const products = JSON.parse(await fs.promises.readFile(this.fileName,'utf-8'));
            let remainingProducts = products.filter(product => {
                if(product._id === id){
                    productToDelete = product
                }
                return product._id !== id;
            })
            await fs.promises.writeFile(this.fileName, JSON.stringify(remainingProducts));
            return productToDelete;
        } catch(error){
            errorLog.error(error);
        }

    }
}

module.exports = {ProductsFileDAO};