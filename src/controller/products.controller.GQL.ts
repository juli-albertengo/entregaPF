import {ApiProducts} from '../api/api.products'

export class ProductsControllerGQL {
    public apiProducts: ApiProducts;

    constructor() {
        this.apiProducts = new ApiProducts()
    }

    getAllProducts = async () => {
        try {
            let products = await this.apiProducts.getAllProducts();
            return products;
        }
        catch(error) {
            console.log(error)
            return {message: "There has been an error fetching the products."};
        }
    }

    getProductById = async(id: string) => {
        try {
            let product = await this.apiProducts.getProductById(id);
            return product
        }
        catch (error){
            console.log(error);
            return {message: "There has been an error fetching the product."}
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
            console.log(error);
            return {message: "There has been an error saving the product."};
        }
    }

}