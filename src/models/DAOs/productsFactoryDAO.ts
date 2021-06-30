import {ProductsDBMongoDAO} from './productsDBMongo';

export class ProductsFactoryDAO {
    static get(typeOfPersistance: string) {
        switch(typeOfPersistance) {
            //case 'MEM': return new NoticiasMemDAO()
            //case 'FILE': return new NoticiasFileDAO(process.cwd() + '/noticias.json')
            case 'MONGO': return new ProductsDBMongoDAO()
            default: return new ProductsDBMongoDAO()
        }
    }
}
