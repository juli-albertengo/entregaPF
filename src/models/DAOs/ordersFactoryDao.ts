import {OrdersDBMongoDAO} from './ordersDBMongo';

export class OrdersFactoryDAO {
    static get(typeOfPersistance: string) {
        switch(typeOfPersistance) {
            //case 'MEM': return new OrdersMemDAO()
            //case 'FILE': return new OrdersFileDAO(process.cwd() + '/noticias.json')
            case 'MONGO': return new OrdersDBMongoDAO()
            default: return new OrdersDBMongoDAO()
        }
    }
}