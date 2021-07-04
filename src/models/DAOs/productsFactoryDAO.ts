import {ProductsDBMongoDAO} from './productsDBMongo';

export class ProductsFactoryDAO {
    static get(typeOfPersistance: string) {
        switch(typeOfPersistance) {
            //case 'MEM': return new ProductsMemDAO()
            //case 'FILE': return new ProductsFileDAO(process.cwd() + '/noticias.json')
            //case 'GRAPHQL': return new ProductsGraphQLDAO()
            case 'MONGO': return new ProductsDBMongoDAO()
            default: return new ProductsDBMongoDAO()
        }
    }
}
