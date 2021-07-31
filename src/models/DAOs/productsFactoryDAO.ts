import {ProductsDBMongoDAO} from './productsDBMongo';

export class ProductsFactoryDAO {
    static get(typeOfPersistance: string) {
        switch(typeOfPersistance) {
            case 'MONGO': return new ProductsDBMongoDAO()
            default: return new ProductsDBMongoDAO()
        }
    }
}
