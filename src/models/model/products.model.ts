export class Product {

    public name: string
    public category: string
    public description: string
    public foto: string
    public price: number

    constructor(category: string, name: string, description: string, foto: string, price:number){
        this.name = name;
        this.category = category;
        this.description = description;
        this.foto = foto;
        this.price = price;
    }

}

export class Products {

    products: Array<Product>;
    
    constructor(arrayProducts: Array<Product>){
        this.products = arrayProducts;
    }
}

//MONGOOSE MODEL
import mongoose from 'mongoose';
const product = 'product';

const productSchema = new mongoose.Schema({
    name: {type: String, required: true, max: 50},
    category: {type: String, required: true},
    description: {type: String, required: true},
    foto: {type: String, required: true, max: 50},
    price: {type: Number, required: true},
})

const productModel = mongoose.model(product, productSchema);

export default productModel;