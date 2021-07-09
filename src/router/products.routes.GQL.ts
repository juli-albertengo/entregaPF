const config = require('../config'); 
import {graphqlHTTP} from 'express-graphql';
import {buildSchema} from 'graphql';
import { ProductsControllerGQL } from "../controller/products.controller.GQL";

class ProductsRouterGraphQL {
    public ProductsControllerGQL: ProductsControllerGQL;

    constructor(){
        this.ProductsControllerGQL = new ProductsControllerGQL();
    }

    start(){
        //GraphQL schema
        const productsSchema = buildSchema(`
            type Query {
                productsAll: [Product],
                productsCategory(category: String): [Product],
                product(id: String): Product
            },
            type Mutation {
                addProduct(name: String!, category: String!, description: String!, foto: String!, price: Int!): Product,
                updateProduct(id: String!, name: String!, category: String!, description: String!, foto: String!, price: Int!): Product,
                deleteProduct(id: String): Product
            },
            type Product {
                id: String
                name: String
                category: String
                description: String
                foto: String
                price: Int
            }
        `);

        //Root Resolver
        const root = {
            productsAll: async() => { 
                const products = await this.ProductsControllerGQL.getAllProducts();
                return products;
            },
            productsCategory: async(data: any) => {
                const {category} = data
                const products = await this.ProductsControllerGQL.getProductByCategory(category);
                return products;
            },
            product: async(data: any) => {
                const {id} = data;
                const product = await this.ProductsControllerGQL.getProductById(id);
                return product;
            },
            addProduct: async(product: any) => {
                const addedProduct = await this.ProductsControllerGQL.addProduct(product);
                return addedProduct;    
            },
            updateProduct: async(data: any) => {
                const id = data.id;
                const product = {
                    name: data.name,
                    category: data.category,
                    description: data.description,
                    foto: data.foto,
                    price: data.price
                }
                const modifiedProduct = await this.ProductsControllerGQL.updateProductById(id, product);
                return modifiedProduct;  
            },
            deleteProduct: async(data: any) => {
                const id = data.id;
                const deletedProduct = await this.ProductsControllerGQL.deleteProduct(id);
                return deletedProduct;
            }
        };

        return graphqlHTTP({
            schema: productsSchema,
            rootValue: root,
            graphiql: config.GRAPHIQL || true
        })
    }

}

export default ProductsRouterGraphQL;
