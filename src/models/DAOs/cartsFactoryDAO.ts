import {CartsDBMongoDAO} from './cartsDBMongo';

export class CartsFactoryDAO {
    static get(typeOfPersistance: string) {
        switch(typeOfPersistance) {
            //case 'MEM': return new CartsMemDAO()
            //case 'FILE': return new CartsFileDAO(process.cwd() + '/noticias.json')
            case 'MONGO': return new CartsDBMongoDAO()
            default: return new CartsDBMongoDAO()
        }
    }
}