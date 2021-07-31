import {CartsDBMongoDAO} from './cartsDBMongo';

export class CartsFactoryDAO {
    static get(typeOfPersistance: string) {
        switch(typeOfPersistance) {
            case 'MONGO': return new CartsDBMongoDAO()
            default: return new CartsDBMongoDAO()
        }
    }
}