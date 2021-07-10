import path from 'path';
const {ProductsFileDAO} = require('./productsFile');
import {ProductsDBMongoDAO} from './productsDBMongo';

export class ProductsFactoryDAO {
    static get(typeOfPersistance: string) {
        switch(typeOfPersistance) {
            case 'FILE': return new ProductsFileDAO(path.join(__dirname + '/../../services/products.json'))
            case 'MONGO': return new ProductsDBMongoDAO()
            default: return new ProductsDBMongoDAO()
        }
    }
}
