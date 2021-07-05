const config = require('../config'); 
import {graphqlHTTP} from 'express-graphql';
import {buildSchema} from 'graphql';
import { ProductsControllerGQL } from "../controller/products.controller.GQL";

class ProductsRouterGraphQL {
    public ProductsControllerGQL: ProductsControllerGQL;

    constructor(){
        this.ProductsControllerGQL = new ProductsControllerGQL()
    }

    start(){
        //GraphQL schema
        const productsSchema = buildSchema(`
            type Query {
                products: [Product],
                product(id: String): Product
            },
            type Mutation {
                addProduct(name: String!, category: String!, description: String!, foto: String!, price: Int!): Product
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
            products: async() => { 
                const products = await this.ProductsControllerGQL.getAllProducts();
                return products;
            },
            product: async(data: any) => {
                const {id} = data;
                const product = await this.ProductsControllerGQL.getProductById(id);
                return product;
            },
            addProduct: async(product: any) => {
                const addedProduct = await this.ProductsControllerGQL.addProduct(product)
                return addedProduct;    
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
