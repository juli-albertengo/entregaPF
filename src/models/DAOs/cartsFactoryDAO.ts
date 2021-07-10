import {CartsDBMongoDAO} from './cartsDBMongo';

export class CartsFactoryDAO {
    static get(typeOfPersistance: string) {
        switch(typeOfPersistance) {
            //case 'FILE': return new CartsFileDAO('carts.json')
            case 'MONGO': return new CartsDBMongoDAO()
            default: return new CartsDBMongoDAO()
        }
    }
}