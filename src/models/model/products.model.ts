import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class Product {
    @IsNotEmpty()
    @IsString()
    readonly name: string;
    @IsNotEmpty()
    @IsString()
    readonly category: string;
    @IsNotEmpty()
    @IsString()
    readonly description: string;
    readonly fotos: Array<string>;
    @IsNotEmpty()
    @IsInt()
    readonly price: number;
    @IsNotEmpty()
    @IsInt()
    readonly stock: number;

    constructor(name: string, category: string, description: string, fotos: Array<string>, price: number, stock: number){
        this.name = name;
        this.category = category;
        this.description = description;
        this.fotos = fotos || [];
        this.price = price;
        this.stock = stock;
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
    category: {type: String, required: true, max: 50},
    description: {type: String, required: true, max: 200},
    fotos: {type: Array, required: true},
    price: {type: Number, required: true},
    stock: {type: Number, required: true}
})

const productModel = mongoose.model(product, productSchema);

export default productModel;